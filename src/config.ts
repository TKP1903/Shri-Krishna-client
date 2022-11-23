const BRAND_NAME = "Shri Krishna Institute®";
const APP_MODE: string = "PROD";

const API_URL = (() => {
  switch (APP_MODE) {
    case "DEV":
      return "http://localhost:4000/v1";
    case "PROD":
      // aws ec2
      return "http://43.205.236.93/v1";
    default:
      return "http://localhost:4000/v1";
  }
})();

export {
  // ...
  // Path: src\config.ts
  // ...
  BRAND_NAME,
  API_URL,
  APP_MODE,
};
