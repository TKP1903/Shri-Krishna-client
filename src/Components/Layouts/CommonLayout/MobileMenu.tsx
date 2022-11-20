/**
 * Menu for small screens
 * when hamburger menu is clicked
 * @param props
 * @returns
 * @constructor
 */

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
// Hamburger Icon
import MenuIcon from "@mui/icons-material/Menu";
// Close Icon
import CloseIcon from "@mui/icons-material/Close";
// make styles
// import { makeStyles } from "@mui/styles";

export default function MobileMenu({
  sections,
  show,
}: {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  show: boolean;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleDrawerOpen}>
        <MenuIcon />
      </span>
      <Box>
        <Drawer
          PaperProps={{
            sx: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              textAlign: "right",
            },
          }}
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
        >
          {/* put the list at the end of the box */}
          <div
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              textAlign: "right",
            }}
            role="presentation"
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {sections.map((section) => (
                <ListItem
                  button
                  key={section.title}
                  sx={{
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                  onClick={() => navigate(section.url)}
                >
                  <ListItemText primary={section.title} />
                </ListItem>
              ))}
              <ListItem
                //   classes={{ root: classes.root }}
                sx={{
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                onClick={handleDrawerClose}
              >
                {/* Close button */}
                <Button onClick={handleDrawerClose}>
                  <CloseIcon />
                  <span>Close</span>
                </Button>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Box>
    </>
  );
}
