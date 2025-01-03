import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import { addBlog, fetchBlogById, updateBlog } from "../api/blogService";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../components/Notification";
import LoadingBar from "../components/LoadingBar";
import { validateForm } from "../utils/validateForm";

const AddEditBlog: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(id ? true : false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tags: "",
  });

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
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every(error => error === "")
    
    if (isValid) {
      try {
        setSubmitting(true);
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
    } else {
      setNotification({
        type: "error",
        message:
          "Some required fields are missing or invalid.",
      });
    }
  };

  const handleFocus = (field: "title" | "content" | "tags") => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    if (notification) setNotification(null);
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
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
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
            label="Blog Title *"
            variant="outlined"
            aria-label= "Blog Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ marginBottom: 2 }}
            error={!!errors.title}
            helperText={errors.title}
            onFocus={() => handleFocus("title")}
          />
          <TextField
            label="Blog Content *"
            variant="outlined"
            aria-label= "Blog Content"
            fullWidth
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            multiline
            rows={6}
            sx={{ marginBottom: 2 }}
            error={!!errors.content}
            helperText={errors.content}
            onFocus={() => handleFocus("content")}
          />
          <TextField
            label="Tags (comma separated) *"
            variant="outlined"
            aria-label= "Blog Tags"
            fullWidth
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            error={!!errors.tags}
            helperText={errors.tags}
            onFocus={() => handleFocus("tags")}
          />
          <Button
            variant="contained"
            type="submit"
            aria-label= "Submit Blog"
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
      {notification && <Notification notification={notification} />}
    </Box>
  );
};

export default AddEditBlog;
