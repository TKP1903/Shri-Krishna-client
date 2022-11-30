import * as React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function useCollapsible() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return {
    Collapse: ({ children }: { children: React.ReactNode }) => (
      <Collapse in={expanded} timeout="auto">
        {children}
      </Collapse>
    ),
    ExpandMore: ({ children }: { children?: React.ReactNode }) => (
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        {children}
        <ExpandMoreIcon />
      </ExpandMore>
    ),
  };
}
