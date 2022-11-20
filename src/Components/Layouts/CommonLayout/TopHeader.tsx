import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import BrandLogo from "../../BrandLogo";
import { BRAND_NAME } from "../../../config";

import { throttle } from "../../../utils/js";

export default ({
  DesktopNav,
  sections,
}: {
  DesktopNav:
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
    | (({
        sections,
        title,
      }: {
        sections: readonly {
          title: string;
          url: string;
        }[];
        title: string;
      }) => JSX.Element);
  sections: readonly {
    title: string;
    url: string;
  }[];
}) => {
  /**
   * change navbarstyle when scroll
   * change color, background-color, box-shadow
   * fix the navbar to the top of the page when scroll up
   * hide the navbar when scroll down
   * */
  const [navbarStyle, setNavbarStyle] = React.useState<React.CSSProperties>(
    navbarStyles.NO_SCROLL
  );

  const [scrollDirection, setScrollDirection] = React.useState<
    "up" | "down" | "none"
  >("none");

  const onScroll = throttle(
    (() => {
      const lastY = window.scrollY;
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentY = window.scrollY;
            if (currentY > lastY) {
              setScrollDirection("down");
            } else if (currentY < lastY) {
              setScrollDirection("up");
            }
            ticking = false;
          });
          ticking = true;
        }
      };
    })(),
    250
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    switch (scrollDirection) {
      case "up":
        setNavbarStyle(navbarStyles.scrollUp);
        break;
      case "down":
        setNavbarStyle(navbarStyles.scrollDown);
        break;
      case "none":
        setNavbarStyle(navbarStyles.NO_SCROLL);
        break;
      default:
        setNavbarStyle(navbarStyles.NO_SCROLL);
        break;
    }
  }, [scrollDirection]);

  return (
    <AppBar className="navbar" position="fixed">
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        <BrandLogo title={BRAND_NAME} />
      </Typography>
      <DesktopNav sections={sections} title="Shri Krishna Institute" />
    </AppBar>
  );
};
