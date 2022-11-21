import * as React from "react";

import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

import Title from "./Title";

export default function Player({
  video,
}: {
  video: {
    title: string;
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

  return (
    <React.Fragment>
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
          width="100%"
          height="100%"
          src={video.embed}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
      <Title>{video.title}</Title>
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
