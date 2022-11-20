import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

import SearchBox from "../../Components/Header/SearchBox";
import Navbar from "./Navbar";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
          onClick={() => navigate("/")}
        >
          {title}
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}
