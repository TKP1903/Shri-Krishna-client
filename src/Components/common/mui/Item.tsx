import { Paper, styled } from "@mui/material";

export default styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 40,
  lineHeight: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
