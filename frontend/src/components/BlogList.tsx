// components/BlogList.tsx
import React from 'react';
import { Box } from '@mui/material';
import BlogCard from './BlogCard';
import { Blog } from '../utils/blogTypes';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </Box>
  );
};

export default BlogList;
