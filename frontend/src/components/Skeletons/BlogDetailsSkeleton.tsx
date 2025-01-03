import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@progress/kendo-react-layout";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Box } from "@mui/material";

const BlogDetailsSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        minHeight: "70vh",
        background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
      }}
    >
      <Card
        style={{
          padding: "1rem",
          maxWidth: "800px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader>
          <Skeleton
            style={{ width: "80%", height: "2rem", marginBottom: "0.5rem" }}
          />
          <Skeleton
            style={{ width: "60%", height: "1.2rem", marginBottom: "0.5rem" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton
              style={{ width: "40%", height: "1rem", marginBottom: "0.5rem" }}
            />
            <Skeleton
              style={{ width: "20%", height: "1rem", marginBottom: "0.5rem" }}
            />
          </Box>
        </CardHeader>
        <CardBody>
          <Skeleton
            style={{ width: "100%", height: "4rem", marginBottom: "1rem" }}
          />
          <Skeleton style={{ width: "100%", height: "4rem" }} />
        </CardBody>
        <CardFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Skeleton style={{ width: "30%", height: "2.5rem" }} />
          <Skeleton style={{ width: "30%", height: "2.5rem" }} />
        </CardFooter>
      </Card>
    </Box>
  );
};

export default BlogDetailsSkeleton;
