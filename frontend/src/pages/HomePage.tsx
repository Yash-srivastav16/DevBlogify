import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blogService";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";
import { Blog } from "../interfaces/blogTypes";
import ServerError from "../components/ServerError";
import NoBlogsFound from "../components/NoBlogsFound";
import LoadingBar from "../components/LoadingBar";
import { Box } from "@mui/material";

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  const handleResetFilter = () => {
    setFilteredBlogs(blogs);
    setSearchQuery("");
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();

        // Ensure tags are arrays
        const formattedData = data.map((blog: { tags: any }) => ({
          ...blog,
          tags: Array.isArray(blog.tags)
            ? blog.tags
            : (blog.tags || "").split(",").map((tag: string) => tag.trim()),
        }));

        setBlogs(formattedData);
        setFilteredBlogs(formattedData);
      } catch (err) {
        setError("Network error! Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const uniqueTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  if (error) return <ServerError errorMessage={error} />;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #e3f2fd, #e0f7fa)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          availableTags={uniqueTags}
        />
        {filteredBlogs.length > 0 ? (
          <BlogList blogs={filteredBlogs} />
        ) : (
          <NoBlogsFound
            message="No blogs match your search criteria."
            onResetFilter={handleResetFilter}
          />
        )}
      </Box>
    </div>
  );
};

export default HomePage;
