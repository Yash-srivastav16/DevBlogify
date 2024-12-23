import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blogService";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";
import { Blog } from "../utils/blogTypes";
import ServerError from "../components/ServerError";
import NoBlogsFound from "../components/NoBlogsFound";
import LoadingBar from "../components/LoadingBar";


const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleResetFilter = () => {
    setFilteredBlogs(blogs); 
    setSearchQuery("")
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

  if (error) return  <ServerError errorMessage={error} />;

  if (loading) {
    return <LoadingBar />
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredBlogs.length > 0 ? (<BlogList blogs={filteredBlogs} />) : (<NoBlogsFound  message="No blogs match your search criteria."
          onResetFilter={handleResetFilter}/>)}
    </div>
  );
};

export default HomePage;