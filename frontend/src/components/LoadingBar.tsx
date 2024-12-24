import { Box, CircularProgress } from "@mui/material";
import React from "react";


const LoadingBar: React.FC = () => {

  const animationStyle = ` @keyframes shrinkFade {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }`;

  return (
    <><style>{animationStyle}</style>
    <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "90vh",
          background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
        }}
      >
        <div style={{
          display: "inline-block",
          width: "250px",
          height: "250px",
          animation: "shrinkFade 4s infinite",
        }}><img
      src= "/logo.png"
      alt="Error"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }}
    /></div>
        <CircularProgress />
      </Box>
      </>
  );
};

export default LoadingBar;
