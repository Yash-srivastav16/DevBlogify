import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { addBlog, fetchBlogById, updateBlog } from "../api/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { Notification } from "@progress/kendo-react-notification";
import LoadingBar from "../components/LoadingBar";

const AddEditBlog: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

 
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(id ? true: false);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const fetchedBlog = await fetchBlogById(id);

          setFormData({
            title: fetchedBlog.title,
            content: fetchedBlog.content,
            tags: fetchedBlog.tags,
          });
        } catch (err) {
          console.error("Error fetching blog:", err);
          setNotification({ type: "error", message: "Error fetching blog:" });
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
      };

      let response;
      if (id) {
        response = await updateBlog(id, blogData);
        setNotification({
          type: "success",
          message: "Blog updated successfully!",
        });
      } else {
        response = await addBlog(blogData);
        setNotification({
          type: "success",
          message: "Blog created successfully!",
        });
      }
      setTimeout(() => {
        navigate("/");
        setSubmitting(false);
      }, 2000);
      console.log("Blog created/updated successfully:", response);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Something went wrong!" });
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
        width: "100%",
        padding: 0,
      }}
    >
      <Paper
        sx={{
          margin: "auto",
          boxShadow: 3,
          backgroundColor: "background.paper",
          padding: "1rem",
          paddingRight: "4rem",
          paddingLeft: "4rem",
          marginBottom: "0",
          marginTop: "2.4rem",
          borderRadius: "15px",
          textAlign: "center", 
          background: "linear-gradient(45deg, #1976d2, #0288d1)", 
          color: "#fff", 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '1.5rem', 
              sm: '2rem',   
              md: '2.5rem', 
            },
            color: "#fff", 
            letterSpacing: 1.5,
            fontFamily: "'Poppins', sans-serif",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
          }}
        >
          {id ? "Edit Blog" : "Create New Blog"}
        </Typography>
      </Paper>

      <Paper
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 5,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Blog Content"
            variant="outlined"
            fullWidth
            required
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            multiline
            rows={6}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            required
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={submitting}
            sx={{
              marginTop: 3,
              padding: 1.5,
              textTransform: "uppercase",
              backgroundColor: "primary.main",
              color: "#fff",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Paper>
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

export default AddEditBlog;
