import { Typography, Link, Stack } from "@mui/material";

export default function ErrorPermission() {
  return (
    <div>
      <Typography variant="h1" component="h1" gutterBottom>
        403
      </Typography>
      <Typography variant="body1" gutterBottom>
        You don't have permission to access this page
      </Typography>
      <Stack direction="column" spacing={1}>
        <Typography variant="h3">Go to:</Typography>
        <Typography variant="h5">
          <Link href="/">Home</Link>
        </Typography>
        <Typography variant="h5">
          <Link href="/login">Login</Link>
        </Typography>
      </Stack>
    </div>
  );
}
