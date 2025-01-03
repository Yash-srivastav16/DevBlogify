import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button, Chip } from "@mui/material";
import Notification from "../components/Notification";
import { Dialog } from "@progress/kendo-react-dialogs";
import { fetchBlogById, deleteBlog } from "../api/blogService";
import { Blog } from "../interface/blogTypes";
import LoadingBar from "../components/LoadingBar";
import ShareButton from "../components/ShareButtons";
import NoBlogsFound from "../components/NoBlogsFound";

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
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
        type: "error",
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
    return <LoadingBar />;
  }

  if (!blog) {
    return <NoBlogsFound message="No blog found!" />;
  }

  return (
    <>
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          minHeight: "70vh",
          background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
            maxWidth: "800px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: 5,
            height: "100%",
          }}
        >
          <Typography aria-label={`Blog title: ${blog.title}`} variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {blog.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom aria-label={`Blog timestamp: ${blog.timestamp}`}>
            Posted on: {new Date(blog.timestamp).toLocaleDateString()} at{" "}
            {new Date(blog.timestamp).toLocaleTimeString()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY: "1rem",
            }}
          >
            <Box>
              {blog.tags.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  label={`#${tag}`}
                  size="small"
                  aria-label={`Blog tags: ${blog.tags}`}
                  sx={{
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem",
                    color: "#fff",
                    backgroundColor: "#00695c",
                  }}
                />
              ))}
            </Box>

            <Box>
              <ShareButton url={window.location.href} title={blog.title} />
            </Box>
          </Box>
          <Typography variant="body1" gutterBottom aria-label={`Blog content: ${blog.content}`}>
            {blog.content}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleEdit} aria-label="Edit Blog Button"> 
              Edit Blog
            </Button>
            <Button
              variant="contained"
              color="error"
              aria-label="Delete Blog Button"
              onClick={() => setShowDialog(true)}
            >
              Delete Blog
            </Button>
          </Box>
        </Paper>

        {showDialog && (
          <Dialog title="Delete Blog" onClose={() => setShowDialog(false)}>
            <Typography variant="body1" gutterBottom aria-label="Confirm Delete">
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
                aria-label="Cancel Delete"
                onClick={() => setShowDialog(false)}
                sx={{ marginRight: "1rem" }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" aria-label="Delete Button" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Dialog>
        )}

        {notification && <Notification notification={notification} />}
      </Box>
    </>
  );
};

export default BlogDetailsPage;
