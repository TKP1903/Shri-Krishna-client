// PlayingVideo context

import { createContext, useEffect, useState } from "react";

import { SavedVideo } from "../../types";

type PlayableVideo = SavedVideo | null;
export const PlayingVideoContext = createContext<{
  playingVideo: PlayableVideo | null;
  setPlayingVideo: (video: PlayableVideo) => void;
}>({
  playingVideo: null,
  setPlayingVideo: (video: PlayableVideo) => {},
});

export const PlayingVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playingVideo, setPlayingVideo] = useState<PlayableVideo>(
    sessionStorage.getItem("playingVideo")
      ? JSON.parse(sessionStorage.getItem("playingVideo") || "")
      : null
  );

  useEffect(() => {
    if (!!playingVideo) {
      sessionStorage.setItem("playingVideo", JSON.stringify(playingVideo));
    }
  }, [playingVideo]);

  return (
    <PlayingVideoContext.Provider value={{ playingVideo, setPlayingVideo }}>
      {children}
    </PlayingVideoContext.Provider>
  );
};
