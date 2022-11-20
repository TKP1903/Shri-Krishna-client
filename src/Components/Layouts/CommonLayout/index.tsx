import * as React from "react";
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

// media queries
import useMediaQuery from "@mui/material/useMediaQuery";

import BrandLogo from "../../BrandLogo";
import Navbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenu from "./MobileMenu";
import TopHeader from "./TopHeader";

import { BRAND_NAME } from "../../../config";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mobileNavbar = [{}];

const sections = [
  { title: "About Us", url: "#" },
  { title: "Courses", url: "#" },
  { title: "Teachers", url: "#" },
  { title: "Contact Us", url: "#" },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function Master({
  children,
  HeroSection,
}: {
  children: React.ReactNode;
  HeroSection: () => JSX.Element;
}) {
  import("../../../styles/common-layout.css");
  const matches = useMediaQuery("(min-width:700px)");

  const MobileNav = !matches ? MobileNavbar : React.Fragment;
  const DesktopNav = matches ? Navbar : React.Fragment;

  React.useEffect(() => {
    return () => {
      // Remove the common-layout.css file
      const commonLayout = document.querySelector(
        "link[href*='common-layout.css']"
      );
      if (commonLayout) {
        commonLayout.remove();
      }
    };
  }, []);
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{
          backgroundImage: "url(hero-background.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundColor: "var(--bg-color)",
          minHeight: "100vh",
        }}
      >
        <TopHeader DesktopNav={DesktopNav} sections={sections} />
        <AppBar className="navbar" position="fixed">
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <BrandLogo title={BRAND_NAME} />
          </Typography>
          <DesktopNav sections={sections} title="Shri Krishna Institute" />
        </AppBar>
        {/* Hero unit */}
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}
        >
          <Container
            style={{
              width: "100%",
              padding: 0,
              marginTop: "2rem",
            }}
          >
            <HeroSection />
          </Container>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          {children}
        </Container>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <MobileNav
        icons={[
          {
            icon: <StarIcon />,
            tooltip: "Star",
          },
          {
            icon: <StarIcon />,
            tooltip: "Star",
          },
          {
            icon: <StarIcon />,
            tooltip: "Star",
          },
          {
            icon: <MobileMenu sections={sections} show={true} />,
            tooltip: "Menu",
          },
        ]}
      />
      {/* End footer */}
    </React.Fragment>
  );
}
