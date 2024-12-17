import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blogService";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";
import { Blog } from "../utils/blogTypes";


const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
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
        setError("Failed to load blogs.");
      }
    };
    loadBlogs();
  }, []);

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

  if (error) return <div>{error}</div>;

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default HomePage;