import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import CommonLayout from "../../Components/Layouts/CommonLayout";

import PricingHero from "./Hero";
import MainContent from "./MainContent";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  const navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        
        onClick={() => {
          navigate("/");
        }}
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default () => {
  return (
    <CommonLayout HeroSection={PricingHero}>
      <MainContent />
    </CommonLayout>
  );
};
