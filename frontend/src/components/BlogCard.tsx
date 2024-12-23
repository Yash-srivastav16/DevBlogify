import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import Chip from "@mui/material/Chip";
import { Blog } from "../utils/blogTypes";
import { useNavigate } from "react-router-dom";
import ShareButton from "./ShareButtons";

// Helper function to check if the date is today
const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const creationDate = new Date(blog.timestamp);
  const showNewTag = isToday(creationDate); // Check if it's created today

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(blog.title);

  return (
    <Card
      style={{
        width: "300px",
        height: "370px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease-in-out",
        position: "relative", 
      }}
      onMouseOver={(e: { currentTarget: { style: { transform: string } } }) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseOut={(e: { currentTarget: { style: { transform: string } } }) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      {showNewTag && (
        <Box
          sx={{
            position: "absolute",
            top: "-3px", 
            zIndex: 2, 
          }}
        >
          <Chip
            label="New"
            color="error"
            size="small"
            sx={{
              fontWeight: "bold",
              borderRadius: "4px",
              backgroundColor: "#d32f2f",
              color: "#fff", 
              padding: "0.5rem",
            }}
          />
        </Box>
      )}

      <CardHeader
        style={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textAlign: "center",
          padding: "1rem",
          height: "5rem",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textAlign: "center",
            paddingTop: "6px",
          }}
          title={blog.title}
        >
          {blog.title}
        </Typography>
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
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            fontSize: "0.9rem",
            color: "#5f6368",
          }}
        >
          {blog.content.slice(0, 100)}...
        </Typography>
        <Box>
          {blog.tags.map((tag: string, index: number) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              sx={{
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#00695c",
                color: "#fff",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
      </CardBody>

      <CardFooter
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <ShareButton url={shareUrl} title={shareText} />
        <Button
          onClick={handleReadMore}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            borderColor: "#1976d2",
          }}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
