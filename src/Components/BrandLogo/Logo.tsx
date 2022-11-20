import Typography from "@mui/material/Typography";

export default function Logo({ title = "" }) {
  return (
    <>
      {/* <img
        src="/logo.png"
        alt="logo"
        // style={{ width: "50px", height: "50px" }}
      /> */}
      <span
        className="brand-logo-text"
        // style={{
        //   fontFamily: "Kingthings Petrock",
        //   fontSize: "3rem",
        //   color: "black",
        //   textTransform: "lowercase",
        //   margin: "0",
        //   padding: "0",
        // }}
      >
        {" "}
        {title}{" "}
      </span>
    </>
  );
}
