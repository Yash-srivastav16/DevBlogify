import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBar: React.FC = () => {
  return (
    <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <CircularProgress />
      </Box>
  );
};

export default LoadingBar;
