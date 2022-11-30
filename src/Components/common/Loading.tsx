import { CircularProgress, Container } from "@mui/material";

export default function Loading({
  message,
  sx,
}: {
  message?: string;
  sx?: any;
}) {
  return (
    <Container
      sx={
        sx || {
          width: "100%",
          minWidth: "fit-content",
          height: "100%",
        }
      }
    >
      <div>
        <CircularProgress />
      </div>
      {message && <div>{message}</div>}
    </Container>
  );
}
