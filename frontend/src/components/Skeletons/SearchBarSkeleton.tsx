import React from "react";
import { Skeleton } from "@progress/kendo-react-indicators";

const SearchBarSkeleton: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        width: "100%",
      }}
    >
      <Skeleton
        shape="text"
        style={{
          width: "30%",
          height: "58px",
          borderRadius: "25px",
          marginBottom: "6px"
        }}
      />

      <Skeleton
        shape="rectangle"
        style={{
          width: "100%",
          maxWidth: "450px",
          height: "50px",
          borderRadius: "25px",
          backgroundColor: "#e0e0e0",
          marginBottom: "30px"
        }}
      />
    </div>
  );
};

export default SearchBarSkeleton;
