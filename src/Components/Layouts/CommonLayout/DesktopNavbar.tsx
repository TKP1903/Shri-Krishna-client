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

import BrandLogo from "../../BrandLogo";
// import throttle from utils/js
import { throttle } from "../../../utils/js";

const navbarStyles = {
  NO_SCROLL: {
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

export default function Navbar({
  sections,
  title,
}: {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}) {
  const navigate = useNavigate();

  return (
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {sections.map((section) => (
            <Link
              key={section.title}
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5, cursor: "pointer", fontSize: "1.2rem" }}
              onClick={() => navigate(section.url)}
            >
              {section.title}
            </Link>
          ))}
        </nav>
        <Button
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Toolbar>
  );
}

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <GlobalStyles
//         styles={{
//           ul: {
//             margin: 0,
//             padding: 0,
//             listStyle: "none",
//           },
//         }}
//       />
//       <AppBar position="static" color="default" elevation={0}>
//         <Toolbar sx={{ flexWrap: "wrap" }}>
//           <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//             {title}
//           </Typography>
//           <nav>
//             <Link
//               variant="button"
//               color="text.primary"
//               href="#"
//               sx={{ my: 1, mx: 1.5 }}
//             >
//               Features
//             </Link>
//             <Link
//               variant="button"
//               color="text.primary"
//               href="#"
//               sx={{ my: 1, mx: 1.5 }}
//             >
//               Enterprise
//             </Link>
//             <Link
//               variant="button"
//               color="text.primary"
//               href="#"
//               sx={{ my: 1, mx: 1.5 }}
//             >
//               Support
//             </Link>
//           </nav>
//           <Button
//             href="#"
//             color="primary"
//             variant="outlined"
//             sx={{ my: 1, mx: 1.5 }}
//           >
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// }
