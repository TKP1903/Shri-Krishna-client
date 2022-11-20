import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

// import BrandLogo from "../../BrandLogo";
// // import throttle from utils/js
// import { throttle } from "../../../utils/js";

/**
 * Navabar fixed at the bottom of the screen
 * Small screen only
 * 4 Icons at the bottom of the screen
 * Last Icon for expaned menu
 */

export default function MobileNavbar({
  icons,
}: {
  icons: ReadonlyArray<{
    icon: JSX.Element;
    tooltip: string;
    onClick?: () => any;
  }>;
}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {icons.map((icon, index) => (
            <Button
              key={icon?.tooltip + index}
              sx={{ color: "white" }}
              onClick={!!icon?.onClick ? icon.onClick : () => {}}
            >
              {icon.icon}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
