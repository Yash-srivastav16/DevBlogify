import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBar: React.FC = () => {
  return (
    <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
        }}
      >
        <CircularProgress />
      </Box>
  );
};

export default LoadingBar;
