// components/BlogCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Button, Chip } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { Blog } from '../utils/blogTypes';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: 5,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 10,
          transform: "scale(1.05)",
        },
        border: "1px solid #ffffff",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/600x400.png?text=Dev+Blogify"
        alt="Blog Image"
      />
      <CardContent sx={{ flex: 1, padding: "1.5rem" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: "1rem" }}>
          {blog.content.slice(0, 100)}...
        </Typography>
        <Box sx={{ marginTop: "0.5rem" }}>
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
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
        <IconButton color="primary" size="small">
          <Facebook />
        </IconButton>
        <IconButton color="primary" size="small">
          <Twitter />
        </IconButton>
        <IconButton color="primary" size="small">
          <LinkedIn />
        </IconButton>
        <Button size="small" variant="contained" color="primary">
          <Typography variant="button" sx={{ marginRight: "0.5rem" }}>
            Read More
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

export default BlogCard;
