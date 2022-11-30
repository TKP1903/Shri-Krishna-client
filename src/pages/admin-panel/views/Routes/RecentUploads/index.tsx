import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
// mui imports
import {
  Box,
  Button,
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

import { UserContext } from "../../../../../helpers/UserDataContext";
import { getRecentUploads } from "../../../../../utils/api/videos";
import { useCollapsible } from "../../../../../utils/hooks/mui";
import { Loading } from "../../common";
import Upload from "./popups/Upload";

const { useState, useEffect, useContext } = React;

interface VideoEntry {
  id: number;
  title: string;
  description: string;
  single_img: string;
  protected_embed: string;
  createdAt: string;
  updatedAt: string;
}

const dummyData: VideoEntry[] = [
  {
    id: 1,
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 1,
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 1,
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 1,
    title: "Video 1",
    description: "This is a protected_embed",
    single_img: "https://picsum.photos/200/300",
    protected_embed: "https://www.youtube.com/watch?v=7sDY4m8KNLc",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
];

const VideoCard = ({ item }: { item: VideoEntry }) => {
  const { Collapse, ExpandMore } = useCollapsible();
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
        <IconButton sx={{ ml: "auto" }} aria-label="open">
          <Button variant="contained" color="primary">
            Open
          </Button>
        </IconButton>
        <IconButton sx={{ ml: "auto" }} aria-label="delete">
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </IconButton>
        <IconButton sx={{ ml: "auto" }}>
          <Button variant="contained" color="warning" startIcon={<EditIcon />}>
            Edit
          </Button>
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<VideoEntry[] | null>(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const CancelTokenSource = CancelToken.source();
    const fetchData = async () => {
      if (!tokens) return;
      try {
        const accessToken = tokens.access.token;
        const data = await getRecentUploads(accessToken, CancelTokenSource);
        setData(data);
      } catch (error: any) {
        enqueueSnackbar(error?.message || "Unknown error", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      CancelTokenSource.cancel();
    };
  }, []);
  if (isLoading) {
    return <Loading message="Getting data..." />;
  }
  return (
    <>
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
        {data &&
          data?.map((item: any, index) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id + index}>
              <VideoCard item={item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
