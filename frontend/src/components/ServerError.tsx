import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ServerErrorProps {
  errorMessage: string;
}

const ServerError: React.FC<ServerErrorProps> = ({ errorMessage }) => {
  return (
    <Snackbar open={true} autoHideDuration={4000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ServerError;
