import React from "react";
import { Box, Typography, Button, Alert, Snackbar } from "@mui/material";

interface ServerErrorProps {
  errorMessage: string;
}

const ServerError: React.FC<ServerErrorProps> = ({
  errorMessage
}) => {
  const handleRefresh = () => {
    window.location.reload(); 
  };
  return (
<>
    <Snackbar open={true} autoHideDuration={4000}>
    <Alert severity="error" sx={{ width: "100%" }}>
      {errorMessage}
    </Alert>
  </Snackbar>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        padding: "2rem",
        minHeight: "80vh",
        maxWidth: "100%",
        background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
      }}
    >
      <img
        src= "/server-error.webp"
        alt="Error"
        style={{
          width: "370px",
          height: "370px",
          marginBottom: "1rem",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "#333",
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {errorMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        aria-label= "Refresh Page"
        onClick={handleRefresh}
        sx={{
          textTransform: "none",
        }}
      >
        Refresh Page
      </Button>
    </Box>
    </>
  );
};

export default ServerError;
