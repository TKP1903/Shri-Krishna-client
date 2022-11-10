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
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="header-title"
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          style={{ cursor: "text", fontSize: "2rem" }}
        >
          {title}
        </Typography>
        <div className="searchBox-desktop">
          <SearchBox />
        </div>
      </Toolbar>
      <Navbar sections={sections} />
      <div className="searchBox-mobile">
        <SearchBox />
      </div>
    </React.Fragment>
  );
}
