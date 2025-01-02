import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface NoBlogsFoundProps {
  message: string;
  onResetFilter?: () => void;
  image?: string;
}

const NoBlogsFound: React.FC<NoBlogsFoundProps> = ({
  message,
  onResetFilter,
  image = "/no-result.webp", 
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <img
        src={image}
        alt="No Blogs Found"
        style={{
          maxWidth: "230px",
          width: "100%",
          borderRadius: "10px",
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#555" }}
      >
        {message}
      </Typography>
      {onResetFilter && (
        <Button
          variant="contained"
          color="primary"
          onClick={onResetFilter}
          sx={{ marginTop: "1rem" }}
        >
          Reset Search
        </Button>
      )}
    </Box>
  );
};

export default NoBlogsFound;
