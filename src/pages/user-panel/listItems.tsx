import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";

const mainList = [
  {
    text: "Classroom",
    icon: <SchoolIcon />,
  },
  {
    text: "Courses",
    icon: <AssignmentIcon />,
  },
  {
    text: "Students",
    icon: <PeopleIcon />,
  },
  {
    text: "Reports",
    icon: <BarChartIcon />,
  },
  {
    text: "Integrations",
    icon: <LayersIcon />,
  },
];

const secondaryList = {
  title: "Bookmarks",
  items: [
    {
      lectureName: "Lecture 1",
      lectureLink: "https://www.youtube.com/watch?v=1",
    },
    {
      lectureName: "Lecture 2",
      lectureLink: "https://www.youtube.com/watch?v=2",
    },
    {
      lectureName: "Lecture 3",
      lectureLink: "https://www.youtube.com/watch?v=3",
    },
  ],
};

export const mainListItems = (
  <React.Fragment>
    {mainList.map((item, index) => (
      <ListItemButton key={"button" + index}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader inset>{secondaryList.title}</ListSubheader>
    {secondaryList.items.map((item, index) => (
      <ListItemButton key={index}>
        {/* <ListItemIcon>
          <img src={item.thumbnail} alt="thumbnail" />
        </ListItemIcon> */}
        <ListItemText primary={item.lectureName} />
      </ListItemButton>
    ))}
  </React.Fragment>
);
