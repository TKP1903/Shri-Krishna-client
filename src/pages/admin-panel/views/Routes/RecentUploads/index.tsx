import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useNavigate } from "react-router";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
// mui imports
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { PlayingVideoContext } from "../../../../../helpers/PlayingVideoContext";
import { UserContext } from "../../../../../helpers/UserDataContext";
import { useVideosContext } from "../../../../../helpers/VideosContext";
import { SavedVideo } from "../../../../../types";
import {
  deleteVideoEntry,
  getRecentUploads,
} from "../../../../../utils/api/videos";
import { useCollapsible } from "../../../../../utils/hooks/mui";
import { Loading } from "../../common";
import Upload from "./popups/Upload";
import { Dispatch } from "redux";

const { useState, useEffect, useContext, createContext } = React;

const dummyrecentVideos: SavedVideo[] = [
  {
    id: "1",
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    splash_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    download_url: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    protected_dl: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    size: "1.2GB",
    filecode: "123456789",
    length: "1:30",
    uploaded: "2021-10-10",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: "1",
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    splash_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    download_url: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    protected_dl: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    size: "1.2GB",
    filecode: "123456789",
    length: "1:30",
    uploaded: "2021-10-10",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: "1",
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    splash_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    download_url: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    protected_dl: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    size: "1.2GB",
    filecode: "123456789",
    length: "1:30",
    uploaded: "2021-10-10",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
];

type RecentVideos = SavedVideo[] | null;
interface RecentVideosContextType {
  recentVideos: SavedVideo[] | null;
  setRecentVideos: (
    vidoes: RecentVideos | ((prev: RecentVideos) => RecentVideos)
  ) => void;
}

const RecentVideosContext = createContext<RecentVideosContextType>({
  recentVideos: [],
  setRecentVideos: (
    videos: RecentVideos | ((prev: RecentVideos) => RecentVideos)
  ) => {},
});

const VideoCard = ({ item, index }: { item: SavedVideo; index: number }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { tokens } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setPlayingVideo } = useContext(PlayingVideoContext);
  const { setRecentVideos } = useContext(RecentVideosContext);
  const { Collapse, ExpandMore } = useCollapsible();
  const navigate = useNavigate();

  const handelOpen = async (video: SavedVideo) => {
    await setPlayingVideo(video);
    navigate("/admin-panel/classroom/");
  };
  const handleDelete = async (video: SavedVideo) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteVideoEntry(video.id, tokens?.access.token);
      // remove from the list

      setRecentVideos((prev) => {
        if (!prev) return [];
        const newRecentVideos = [...prev];
        newRecentVideos.splice(index, 1);
        return newRecentVideos;
      });
      enqueueSnackbar("Video deleted successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error?.message || "Error deleting video", {
        variant: "error",
      });
    }
    setIsDeleting(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "red" }}
            src={item.single_img}
            alt={item.title}
          />
        }
        title={item.title}
        subheader={item.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.single_img}
        alt={item.title}
      />
      <CardActions disableSpacing>
        <IconButton
          sx={{ ml: "auto" }}
          aria-label="open"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handelOpen(item);
          }}
        >
          Open
          {/* <Button variant="contained" color="primary">
          </Button> */}
        </IconButton>
        <IconButton
          sx={{ ml: "auto" }}
          color="error"
          aria-label="delete"
          onClick={(e) => {
            if (isDeleting) return;
            e.preventDefault();
            e.stopPropagation();
            handleDelete(item);
          }}
        >
          {!isDeleting ? (
            "Delete"
          ) : (
            <CircularProgress size={20} color="error" />
          )}
          {/* <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          </Button> */}
        </IconButton>
        <IconButton sx={{ ml: "auto" }} color="warning">
          Edit
          {/* <Button variant="contained" color="warning" startIcon={<EditIcon />}>
          </Button> */}
        </IconButton>
        <ExpandMore />
      </CardActions>
      <Collapse>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item?.description || "No description"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, tokens } = useContext(UserContext);
  const { savedVideos } = useVideosContext();
  const [isLoading, setIsLoading] = useState(true);
  const [recentVideos, setRecentVideos] = useState<SavedVideo[] | null>(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const CancelTokenSource = CancelToken.source();
    const fetchrecentVideos = async () => {
      if (!tokens) return;
      try {
        const accessToken = tokens.access.token;
        const recentVideos = await getRecentUploads(
          accessToken,
          CancelTokenSource
        );
        console.log({ recentVideos });
        setRecentVideos(recentVideos);
      } catch (error: any) {
        enqueueSnackbar(error?.message || "Unknown error", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchrecentVideos();
    return () => {
      CancelTokenSource.cancel();
    };
  }, [savedVideos]);

  if (isLoading) {
    return <Loading message="Getting recentVideos..." />;
  }
  return (
    <RecentVideosContext.Provider value={{ recentVideos, setRecentVideos }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mx: 2 }}
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Upload
            trigger={
              <Button variant="contained" color="primary">
                Upload New Video
              </Button>
            }
          />
        </Grid>
        {recentVideos &&
          recentVideos?.map((item: any, index) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id + index}>
              <VideoCard item={item} index={index} />
            </Grid>
          ))}
      </Grid>
    </RecentVideosContext.Provider>
  );
};
