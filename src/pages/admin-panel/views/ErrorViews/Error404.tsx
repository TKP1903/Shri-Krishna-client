import { Typography, Link } from "@mui/material";

export default function Error404() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" gutterBottom>
        Page not found
      </Typography>
      <Link href="/">Go to home</Link>
    </div>
  );
}
