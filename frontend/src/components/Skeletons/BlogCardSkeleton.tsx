import React from "react";
import { Skeleton } from "@progress/kendo-react-indicators";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@progress/kendo-react-layout";

const BlogCardSkeleton: React.FC = () => {
  return (
    <Card
      style={{
        width: "300px",
        height: "373px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        padding: "0",
      }}
    >
      <CardHeader
        style={{
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          padding: "1rem",
          height: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Skeleton
          shape="text"
          style={{
            width: "80%",
            height: "30px",
            borderRadius: "4px",
          }}
        />
        <Skeleton
          shape="text"
          style={{
            width: "60%",
            height: "30px",
            borderRadius: "4px",
          }}
        />
      </CardHeader>

      <CardBody
        style={{
          flex: 1,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Skeleton
            shape="text"
            style={{
              width: "90%",
              height: "20px",
              marginBottom: "0.5rem",
              borderRadius: "4px",
            }}
          />
          <Skeleton
            shape="text"
            style={{
              width: "80%",
              height: "20px",
              borderRadius: "4px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              shape="rectangle"
              style={{
                width: "60px",
                height: "22px",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "10px",
                backgroundColor: "#e0e0e0",
              }}
            />
          ))}
        </div>
      </CardBody>

      <CardFooter
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
          height: "70px",
        }}
      >
        <Skeleton
          shape="rectangle"
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "4px",
          }}
        />
        
        <Skeleton
          shape="rectangle"
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "4px",
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default BlogCardSkeleton;
