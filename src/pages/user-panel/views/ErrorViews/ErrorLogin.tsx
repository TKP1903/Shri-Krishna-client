import { Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ErrorLogin() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        401
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are not logged in
      </Typography>
      <Typography variant="body1" gutterBottom>
        Go to <Link href="/login"> Login </Link>
      </Typography>
    </div>
  );
}
