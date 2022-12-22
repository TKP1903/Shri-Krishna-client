const BRAND_NAME = "Shri Krishna Institute®";
const APP_MODE: string = "PROD";
const DOODSTREAM_API_URL: string = "https://doodapi.com/api";
const DOODSTREAM_API_KEY = "131652vem0pxjwggoj207x";
/**
 * Admin creds
 * email : admin@shri-krishna.com
 * password : Admin@123
 */
const API_URL = (() => {
  switch (APP_MODE) {
    case "DEV":
      return "http://localhost:4000/v1";
    case "PROD":
      // aws ec2
      return "https://15.206.160.172/v1"; 
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
  DOODSTREAM_API_KEY,
  DOODSTREAM_API_URL,
};
