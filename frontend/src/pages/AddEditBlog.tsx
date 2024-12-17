import React, { useState } from "react";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";
import { addBlog } from "../api/blogService";

const AddEditBlog: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Call your addBlog function from the service
        const blogData = {
          title: formData.title,
          content: formData.content,
          tags: formData.tags || ""
        };
        const response = await addBlog(blogData);
        console.log("Blog created successfully:", response);
      } catch (err) {
        console.error(err);
      } 
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: 4 }}>
        Create New Blog
      </Typography>

      <Paper
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 6,
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
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Blog Content"
            variant="outlined"
            fullWidth
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            multiline
            rows={6}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
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
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEditBlog;
