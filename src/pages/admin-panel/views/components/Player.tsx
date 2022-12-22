import * as React from "react";

import { Button, Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

import { AreYouSure } from "../../../../Components/Popups/common";
import { FocusContext } from "../../../../helpers/FocusContext";
import { UserContext } from "../../../../helpers/UserDataContext";
import { PlayingVideoContext } from "../../../../helpers/PlayingVideoContext";
import BlackScreen from "./BlackScreen";
import Title from "./Title";

const { useEffect, useState, useContext } = React;

export default function Player() {
  //   {
  //   video,
  // }: {
  //   video: {
  //     title: string;
  //     embed: string;
  //     description: string;
  //     thumbnail: string;
  //     duration: number;
  //     views?: number;
  //     likes?: number;
  //     dislikes?: number;
  //     comments?: number;
  //     publishedAt?: string;
  //   };
  // }
  const navigate = useNavigate();
  const theme = useTheme();

  const { playingVideo, setPlayingVideo } = useContext(PlayingVideoContext);

  const { isFocus, onFocus, onBlur } = useContext(FocusContext);
  const { user } = useContext(UserContext);

  const video = {
    ...playingVideo,
    embed: playingVideo?.protected_embed || "",
    protected_embed: undefined,
  };

  console.log("Player", { video, user });

  useEffect(() => {
    const player: any = document.querySelector("#player-iframe");
    if (!player) {
      return;
    }
    try {
      // trigger focus exception if mouse is over the iframe
      player.addEventListener("mouseover", () => {
        if (!isFocus) {
          onFocus();
        }
        // if (isFocus) {
        //   player.contentWindow.postMessage(
        //     '{"event":"command","func":"playVideo","args":""}',
        //     "*"
        //   );
        // } else {
        //   player.contentWindow.postMessage(
        //     '{"event":"command","func":"pauseVideo","args":""}',
        //     "*"
        //   );
        // }
      });
    } catch (err) {
      window.alert(err);
    }
  });

  return (
    <React.Fragment>
      <BlackScreen show={!isFocus} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            style={{
              height: 500,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              // if video is not available, show a message
              !video || !video.embed ? (
                <Container
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>
                    No video selected. Please{" "}
                    <a
                      onClick={() =>
                        navigate(
                          user && user.role === "admin"
                            ? "/admin-panel"
                            : "/user-panel" + "/recent-uploads"
                        )
                      }
                      style={{ color: theme.palette.primary.main }}
                    >
                      open
                    </a>{" "}
                    a video.
                  </h1>
                </Container>
              ) : null
            }
            <iframe
              // full width and height
              onMouseOver={(() => {
                let iframe: any;
                let iframeRect: any;
                let iframeX: number;
                let iframeY: number;
                let iframeWidth: number;
                let iframeHeight: number;

                try {
                  iframe = document.querySelector("#player-iframe");
                  iframeRect = iframe?.getBoundingClientRect();
                  iframeX = Number(iframeRect?.x);
                  iframeY = Number(iframeRect?.y);
                  iframeWidth = Number(iframeRect?.width);
                  iframeHeight = Number(iframeRect?.height);
                } catch (err) {}

                return (e) => {
                  // if mouse is inside iframe, set focus to true
                  const xpos = e.clientX;
                  const ypos = e.clientY;
                  iframe = document.querySelector("#player-iframe");
                  if (!iframe) {
                    return;
                  }
                  if (!iframeRect) {
                    iframeRect = iframe.getBoundingClientRect();
                    iframeX = iframeRect.x;
                    iframeY = iframeRect.y;
                    iframeWidth = iframeRect.width;
                    iframeHeight = iframeRect.height;
                    return;
                  }
                  if (
                    xpos >= iframeX &&
                    xpos <= iframeX + iframeWidth &&
                    ypos >= iframeY &&
                    ypos <= iframeY + iframeHeight
                  ) {
                    onFocus();
                  }
                };
              })()}
              onFocus={onFocus}
              width="100%"
              height="100%"
              id="player-iframe"
              src={video.embed}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              scrolling="no"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            margin: "auto",
            padding: 10,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title>{video.title}</Title>
        </Grid>
        <Grid item xs={12}>
          {/* video decription */}
        </Grid>
        {user?.role === "admin" && (
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              style={{
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.default,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <AreYouSure
                  trigger={
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      Delete
                    </Button>
                  }
                  title="Are you sure?"
                  message="You are going to delete this video. This action cannot be undone."
                  onConfirm={() => {
                    console.log("confirmed");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    window.alert("Not implemented yet");
                  }}
                >
                  Change
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
  {
    /* <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
      </ResponsiveContainer> 
      </React.Fragment>
      );
    */
  }
}
