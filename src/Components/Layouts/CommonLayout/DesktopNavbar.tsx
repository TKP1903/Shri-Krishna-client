import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

interface section {
  title: string;
  url: string;
}

export default function Navbar({
  sections,
  title,
}: {
  sections: readonly section[];
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
