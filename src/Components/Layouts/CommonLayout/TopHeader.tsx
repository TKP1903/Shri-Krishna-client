import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import { BRAND_NAME } from "../../../config";
import { ScrollContext } from "../../../helpers/ScrollContext";
import { useIsChanged } from "../../../utils/hooks";
import { throttle } from "../../../utils/js";
import BrandLogo from "../../BrandLogo";

const { useState, useEffect, useContext } = React;

const navbarStyles: any = {
  top: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  scrollUp: {
    transform: "translateY(0)",
    transition: "transform 0.3s ease-in-out",
  },
  scrollDown: {
    transform: "translateY(-100%)",
    transition: "transform 0.3s ease-in-out",
  },
};
const commonStyles = {
  zIndex: 99,
  position: "sticky",
  width: "100%",
};

// add baseline to all properties in navbarStyles
Object.keys(navbarStyles).forEach((key, index) => {
  navbarStyles[key] = { ...commonStyles, ...navbarStyles[key] };
});

interface section {
  title: string;
  url: string;
}
type sectionsType = readonly section[];

export default function ({
  DesktopNav,
  sections,
}: {
  DesktopNav: ({
    sections,
    title,
  }: {
    sections: readonly section[];
    title: string;
  }) => JSX.Element;
  sections: sectionsType;
}) {
  /**
   * change navbarstyle when scroll
   * change color, background-color, box-shadow
   * fix the navbar to the top of the page when scroll up
   * hide the navbar when scroll down
   * */
  const [navbarStyle, setNavbarStyle] = useState<React.CSSProperties>(
    navbarStyles.top
  );

  const { scrollDirection } = useContext(ScrollContext);

  const scrollDirIsChanged = useIsChanged(scrollDirection);

  useEffect(() => {
    switch (scrollDirection) {
      case "up":
        setNavbarStyle(navbarStyles.scrollUp);
        break;
      case "down":
        setNavbarStyle(navbarStyles.scrollDown);
        break;
    }
  }, [scrollDirection]);

  return (
    <AppBar className="navbar" position="fixed" sx={navbarStyle}>
      <BrandLogo title={BRAND_NAME} />
      <DesktopNav sections={sections} title="Shri Krishna Institute" />
    </AppBar>
  );
}
