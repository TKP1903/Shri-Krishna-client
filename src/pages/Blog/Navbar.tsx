import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { useState, useEffect, useRef } from "react";

export default function Navbar({
  sections,
}: {
  sections: ReadonlyArray<{ title: string; url: string }>;
}) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Toolbar
        className="navbar-desktop"
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto", mx: 2 }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {section.title}
            </Typography>
          </Link>
        ))}
      </Toolbar>
      <Toolbar
        ref={mobileMenuRef}
        id="navbar-mobile"
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto", mx: 2 }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {section.title}
            </Typography>
          </Link>
        ))}
        <Button size="small" variant="contained">
          {" "}
          Sign In{" "}
        </Button>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
        {/* Exit the menu */}
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            try {
              mobileMenuRef.current!.style!.display = "none!important";
              mobileMenuRef.current!.style!.visibility = "hidden";
              mobileMenuRef.current!.style!.opacity = "0";
              mobileMenuRef.current!.style!.pointerEvents = "none";
            } catch (er) {
              console.log(er);
            }
          }}
        >
          X
        </Button>
      </Toolbar>
    </>
  );
}
