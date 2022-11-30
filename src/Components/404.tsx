import { Container, Stack, Typography } from "@mui/material";
import CommonLayout from "./Layouts/CommonLayout";

export default function NotFound() {
  return (
    <CommonLayout
      HeroSection={() => (
        <Typography variant="h4" component="h1" gutterBottom>
          Page not found
        </Typography>
      )}
    >
      <Container maxWidth="sm">
        <Stack
          sx={{ mt: 4 }}
          spacing={2}
          direction="column"
          alignItems="center"
        >
          <Typography variant="body1">
            Sorry, we couldn't find the page you're looking for.
          </Typography>
        </Stack>
      </Container>
    </CommonLayout>
  );
}
