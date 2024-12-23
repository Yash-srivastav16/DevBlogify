import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { Notification } from "@progress/kendo-react-notification";
import { Dialog } from "@progress/kendo-react-dialogs";
import { fetchBlogById, deleteBlog } from "../api/blogService";
import { Blog } from "../utils/blogTypes";
import LoadingBar from "../components/LoadingBar";

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogById(id || "");
        const formattedFetchedBlog = {
          ...fetchedBlog,
          tags: Array.isArray(fetchedBlog.tags)
            ? fetchedBlog.tags
            : (fetchedBlog.tags || "")
                .split(",")
                .map((tag: string) => tag.trim()),
        };
        setBlog(formattedFetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setNotification({
          type: "error",
          message: "Failed to load blog details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id || "");
      setNotification({
        type: "success",
        message: "Blog deleted successfully!",
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to delete the blog. Please try again.",
      });
    } finally {
      setShowDialog(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  if (loading) {
    return <LoadingBar />
  }

  if (!blog) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", marginTop: "2rem" }}
      >
        Blog not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          maxWidth: "800px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: 5,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Posted on: {new Date(blog.timestamp).toLocaleDateString()} at{" "}
          {new Date(blog.timestamp).toLocaleTimeString()}
        </Typography>
        <Box sx={{ marginY: "1rem" }}>
          {blog.tags.map((tag: any, index: any) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              sx={{
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#0288d1",
                color: "#fff",
              }}
            />
          ))}
        </Box>
        <Typography variant="body1" gutterBottom>
          {blog.content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit Blog
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowDialog(true)}
          >
            Delete Blog
          </Button>
        </Box>
      </Paper>

      {showDialog && (
        <Dialog title="Delete Blog" onClose={() => setShowDialog(false)}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowDialog(false)}
              sx={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Dialog>
      )}

      {notification && (
        <Notification
          type={{
            style: notification.type === "success" ? "success" : "error",
            icon: true,
          }}
          closable={true}
          onClose={() => setNotification(null)}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        >
          <Typography>{notification.message}</Typography>
        </Notification>
      )}
    </Box>
  );
};

export default BlogDetailsPage;
