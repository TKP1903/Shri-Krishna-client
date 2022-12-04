import axios from "axios";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { MESSAGES, UPLOAD } from "../../constants";
import {
  ArrayElement,
  CdnUploadRes,
  SavedVideo,
  VideoEntry,
} from "../../types";
import { upload as uploadToCdn } from "../../utils/api/doodstream";
import {
  deleteVideoEntry as removeFromDb,
  newVideoEntry as saveToDb,
} from "../../utils/api/videos";
import { UserContext } from "../UserDataContext";

type CdnResult = ArrayElement<CdnUploadRes["result"]>;
interface Video {
  title: string;
  url?: string;
  file: File | null;
}

// TODO :: import the video type
interface VideoUpload {
  video: Video;
  status: "idle" | "uploading" | "saving" | "done" | "errored";
  tries: number;
  progress?: number;
  cancelTokenSource?: any;
  error?: string;
}

interface ContextValue {
  videosUploading: VideoUpload[];
  queueVideo: (video: Video) => void;
  cancelUpload: (index: number, video: VideoUpload) => void;
  savedVideos?: SavedVideo[];
}
export const VideosContext = createContext<ContextValue>({
  videosUploading: [],
  queueVideo: (video: Video) => {},
  cancelUpload: (index: number, video: VideoUpload) => {},
});

export const useVideosContext = () => {
  return useContext(VideosContext);
};

export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, tokens } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const refChachedCdnRes = useRef<{
    [key: string]: CdnResult;
  }>({});

  const [savedVideos, setSavedVideos] = useState<(SavedVideo | CdnResult)[]>(
    []
  );
  const [videosUploading, setVideosUploading] = useState<VideoUpload[]>([]);
  const changeVideoStatus = (index: number, status: VideoUpload["status"]) => {
    setVideosUploading((prev) => {
      const newArr = [...prev];
      newArr[index].status = status;
      return newArr;
    });
  };
  const [uploadStats, setUploadStats] = useState<{
    total: number;
    idle: number;
    uploading: number;
    saving: number;
    done: number;
    errored: number;
  }>({
    total: 0,
    idle: 0,
    uploading: 0,
    saving: 0,
    done: 0,
    errored: 0,
  });
  useEffect(() => {
    if (!videosUploading?.length) {
      return;
    }
    const uploadVideo = (() => {
      const onUploadProgress = (index: number) => (progressEvent: any) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setVideosUploading((prev) => {
          const newArr = [...prev];
          newArr[index].progress = progress;
          return newArr;
        });
      };

      const statusChange = {
        idle2uploading: (index: number, cancelTokenSource: any) => {
          setUploadStats((prev) => ({
            ...prev,
            idle: prev.idle - 1,
          }));
          setVideosUploading((prev) => {
            const newArr = [...prev];
            const obj = newArr[index];
            newArr[index] = {
              ...obj,
              status: "uploading",
              progress: 0,
              cancelTokenSource: cancelTokenSource,
              tries: obj.tries + 1,
            };
            return newArr;
          });
        },
        uploading2saving: (index: number) => {
          setUploadStats((prev) => ({
            ...prev,
            uploading: prev.uploading - 1,
            saving: prev.saving + 1,
          }));
          setVideosUploading((prev) => {
            const newArr = [...prev];
            const obj = newArr[index];
            newArr[index] = {
              ...obj,
              status: "saving",
              progress: 99,
            };
            return newArr;
          });
        },
        saving2done: (index: number) => {
          setUploadStats((prev) => ({
            ...prev,
            saving: prev.saving - 1,
            done: prev.done + 1,
          }));
          setVideosUploading((prev) => {
            const newArr = [...prev];
            const obj = newArr[index];
            newArr[index] = {
              ...obj,
              status: "done",
              progress: 100,
              cancelTokenSource: undefined,
            };
            return newArr;
          });
        },
        error: {
          canceled: (lastStatus: VideoUpload["status"]) => (index: number) => {
            setUploadStats((prev) => ({
              ...prev,
              total: prev.total - 1,
              [lastStatus]: prev[lastStatus] - 1,
            }));
            setVideosUploading((prev) => {
              // remove the video from the array
              const newArr = [...prev];
              newArr.splice(index, 1);
              return newArr;
            });
          },
          uploading: (index: number) => {
            setUploadStats((prev) => ({
              ...prev,
              uploading: prev.uploading - 1,
              errored: prev.errored + 1,
            }));
            setVideosUploading((prev) => {
              const newArr = [...prev];
              const obj = newArr[index];
              newArr[index] = {
                ...obj,
                status: "errored",
                progress: 0,
                cancelTokenSource: undefined,
                error: "Upload failed",
              };
              return newArr;
            });
          },
          saving: (index: number) => {
            setUploadStats((prev) => ({
              ...prev,
              saving: prev.saving - 1,
              errored: prev.errored + 1,
            }));
            setVideosUploading((prev) => {
              const newArr = [...prev];
              newArr[index] = {
                ...newArr[index],
                status: "errored",
                progress: 99,
                cancelTokenSource: undefined,
                error: "Save failed",
              };
              return newArr;
            });
          },
        },
      };

      const uploaders = {
        cdn: async (video: Video, index: number, cancelTokenSource: any) => {
          try {
            if (!video.file) return;
            await statusChange.idle2uploading(index, cancelTokenSource);
            const res = await uploadToCdn(
              video.file,
              cancelTokenSource,
              onUploadProgress(index)
            );
            statusChange.uploading2saving(index);
            return res;
          } catch (err: any) {
            if (axios.isCancel(err)) {
              enqueueSnackbar(MESSAGES.UPLOAD.CANCELLED, {
                variant: "warning",
              });
              statusChange.error.canceled("uploading")(index);
              return null;
            }
            enqueueSnackbar(
              `${MESSAGES.UPLOAD.CDN_ERROR}: ${err.message || "unknown error"}`,
              {
                variant: "error",
              }
            );
            statusChange.error.uploading(index);
            return null;
          }
        },
        db: async (
          cdnRes: CdnResult,
          video: Video,
          index: number,
          cancelTokenSource: any
        ) => {
          try {
            const newVideo = await saveToDb(
              {
                ...cdnRes,
                title: video?.title || video.file?.name || "",
              },
              tokens?.access.token || "",
              cancelTokenSource
            );
            statusChange.saving2done(index);
            return newVideo;
          } catch (err: any) {
            if (axios.isCancel(err)) {
              enqueueSnackbar(MESSAGES.UPLOAD.CANCELLED, {
                variant: "warning",
              });
              statusChange.error.canceled("saving")(index);
              return null;
            }
            enqueueSnackbar(
              `${MESSAGES.UPLOAD.DB_ERROR}: ${err?.message || "unknown error"}`,
              {
                variant: "error",
              }
            );
            statusChange.error.saving(index);
          }
        },
      };
      return async (upload: VideoUpload, index: number) => {
        const video = upload.video;
        try {
          if (!video.file) {
            throw new Error("No file found");
          }
          const cancelTokenSource = axios.CancelToken.source();
          // upload to cdn
          let cdnRes: any = refChachedCdnRes.current[video.title] || null;
          if (!upload?.error || upload.error === "Upload failed") {
            cdnRes = await uploaders.cdn(video, index, cancelTokenSource);
            if (!cdnRes) {
              return;
            }
          }
          refChachedCdnRes.current[video.title] = cdnRes;
          // debugger;
          // save to db
          const savedVideo = await uploaders.db(
            cdnRes,
            video,
            index,
            cancelTokenSource
          );
          if (!savedVideo) {
            return;
          }

          // remove cached cdn result
          delete refChachedCdnRes.current[video.title];

          setSavedVideos((prev) => [...prev, savedVideo]);

          // update state
          enqueueSnackbar(`${video.title} ${MESSAGES.UPLOAD.SUCCESS}`, {
            variant: "success",
          });
        } catch (err: any) {
          console.log(err);
          enqueueSnackbar(err?.message || "unknown error", {
            variant: "error",
          });
        }
      };
    })();

    const uploadNext = () => {
      const firstIdle = videosUploading.findIndex((v) => v.status === "idle");
      if (firstIdle !== -1 && uploadStats.uploading < UPLOAD.PARALLEL_UPLOADS) {
        const upload = videosUploading[firstIdle];
        uploadVideo(upload, firstIdle);
        return;
      }
      const firstErrored = videosUploading.findIndex(
        (v) => v.status === "errored"
      );
      if (
        firstErrored !== -1 &&
        uploadStats.uploading < UPLOAD.PARALLEL_UPLOADS
      ) {
        const upload = videosUploading[firstErrored];
        if (upload.tries >= 3) return;
        uploadVideo(upload, firstErrored);
        return;
      }
    };
    uploadNext();
  }, [videosUploading]);

  const queueVideo = (video: Video) => {
    if (uploadStats.total >= UPLOAD.MAX_UPLOADS) {
      enqueueSnackbar(MESSAGES.UPLOAD.MAX_UPLOADS, { variant: "error" });
      return;
    }

    const newVideoUpload: VideoUpload = {
      video,
      status: "idle",
      tries: 0,
      progress: 0,
    };
    setVideosUploading((prev) => [...prev, newVideoUpload]);
  };

  const cancelUpload = (index: number, video: VideoUpload) => {
    const cancelToken = videosUploading[index].cancelTokenSource;
    cancelToken.cancel();
    setVideosUploading((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  return (
    <VideosContext.Provider
      value={{
        videosUploading,
        queueVideo,
        cancelUpload,
        savedVideos,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
