import { Loading } from "../../../../Components/common";

export default ({
  message = "Loading please wait...",
  sx,
}: {
  message?: string;
  sx?: any;
}) => {
  return (
    <Loading
      message={message}
      sx={{
        ...sx,
        ...{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        },
      }}
    />
  );
};
