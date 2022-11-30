import { Typography, Link, Stack, Box } from "@mui/material";

export default function ErrorSession() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        401
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your session has expired
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
    </Box>
  );
}
