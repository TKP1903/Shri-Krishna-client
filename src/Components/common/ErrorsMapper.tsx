import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const ErrorsMapper = ({ errors }: { errors: string[] }) => {
  if (!errors || !errors.length || !errors[0].length) return <></>;
  return (
    <Stack spacing={2}>
      {errors.map((error) => (
        <Alert severity="error" key={error}>
          {error}
        </Alert>
      ))}
    </Stack>
  );
};

export default ErrorsMapper;
