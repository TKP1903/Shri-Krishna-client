import * as React from "react";

import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

import { FocusContext } from "../../../../helpers/FocusContext";
import BlackScreen from "./BlackScreen";
import Title from "./Title";

const { useEffect, useState, useContext } = React;

export default function Player({
  video,
}: {
  video: {
    name: string;
    embed: string;
    description: string;
    thumbnail: string;
    duration: number;
    views: number;
    likes?: number;
    dislikes?: number;
    comments?: number;
    publishedAt?: string;
  };
}) {
  const theme = useTheme();

  const { isFocus, onFocus, onBlur } = useContext(FocusContext);

  useEffect(() => {
    const player: any = document.querySelector("#player-iframe");
    if (!player) {
      return;
    }
    try {
      // trigger focus exception if mouse is over the iframe
      player.addEventListener("mouseover", 
      () => {
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
      <div>
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
          <iframe
            // full width and height
            onMouseOver={(() => {
              let iframe : any;
              let iframeRect : any;
              let iframeX : number;
              let iframeY : number;
              let iframeWidth : number;
              let iframeHeight : number;

              try {
                iframe       = document.querySelector("#player-iframe");
                iframeRect   = iframe?.getBoundingClientRect();
                iframeX      = Number (iframeRect?.x);
                iframeY      = Number (iframeRect?.y);
                iframeWidth  = Number (iframeRect?.width);
                iframeHeight = Number (iframeRect?.height);
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
            // src={video.embed}
            title={video.titlee}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
        <Title>{video.titlee}</Title>
      </div>
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
