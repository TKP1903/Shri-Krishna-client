// constraints
export const UPLOAD = {
  MAX_UPLOADS: 5,
  PARALLEL_UPLOADS: 2,
  MAX_FILE_SIZE_MB: 500, // 500 MB
};

// messages
export const MESSAGES = {
  UPLOAD: {
    // red
    FILE_TOO_LARGE: `File size exceeds ${UPLOAD.MAX_FILE_SIZE_MB} MB`,
    MAX_UPLOADS: `Only ${UPLOAD.MAX_UPLOADS} files can be uploaded at a time`,
    CDN_ERROR: "Error uploading file",
    DB_ERROR: "Error saving file to database",
    // yellow
    CANCELLED: "Upload cancelled",

    // GREEN
    SUCCESS: "Uploaded successfully",
  },
};
