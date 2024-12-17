import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blogService";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button, Chip, Box, AppBar, Toolbar,Typography as MuiTypography, IconButton} from "@mui/material";
import { TextField, CssBaseline, Tabs, Tab} from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

interface Blog {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0); // Track the currently active tab

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue); // Update the active tab
  };
  const theme = useTheme();
  const toggleTheme = () => setDarkMode(!darkMode);

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

  const customTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  return (
    <><ThemeProvider theme={customTheme}>
          <CssBaseline />
          <AppBar position="sticky">
              <Toolbar>
                  <MuiTypography
                      variant="h6"
                      component={Link}
                      to="/"
                      sx={{
                          flexGrow: 1,
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                      }}
                  >
                      <img
                          src="/logo.png"
                          alt="DevBlogify Logo"
                          style={{ height: "60px", marginRight: "10px" }} />
                      DevBlogify
                  </MuiTypography>
                  <Tabs
                      value={selectedTab}
                      onChange={handleTabChange}
                      textColor="inherit"
                      indicatorColor="primary"
                      aria-label="navigation tabs"
                  >
                      <Tab label="Home" component={Link} to="/" />
                      <Tab label="Add Blog" component={Link} to="/add-blog" />
                      <Tab label="About Developer" component={Link} to="/about" />
                  </Tabs>
                  <IconButton color="inherit" onClick={toggleTheme}>
                      {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
              </Toolbar>
          </AppBar>

          <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
              <TextField
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  label="Search by title or tags..."
                  variant="outlined"
                  fullWidth
                  InputProps={{
                      endAdornment: (
                          <IconButton>
                              <Search />
                          </IconButton>
                      ),
                  }}
                  sx={{
                      maxWidth: "600px",
                  }} />
          </Box>
          <Box
              sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  justifyContent: "center",
              }}
          >
              {filteredBlogs.map((blog) => (
                  <Card
                      key={blog.id}
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
                          alt="Blog Image" />
                      <CardContent sx={{ flex: 1, padding: "1.5rem" }}>
                          <Typography
                              variant="h6"
                              component="div"
                              sx={{ fontWeight: "bold" }}
                          >
                              {blog.title}
                          </Typography>
                          <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ marginTop: "1rem" }}
                          >
                              {blog.content.slice(0, 100)}...
                          </Typography>
                          <Box sx={{ marginTop: "0.5rem" }}>
                              {blog.tags.map((tag, index) => (
                                  <Chip
                                      key={index}
                                      label={`#${tag}`}
                                      size="small"
                                      sx={{
                                          marginRight: "0.5rem",
                                          marginBottom: "0.5rem",
                                          backgroundColor: "#00695c",
                                          color: theme.palette.primary.contrastText,
                                      }} />
                              ))}
                          </Box>
                      </CardContent>

                      <Box
                          sx={{
                              padding: "1rem",
                              display: "flex",
                              justifyContent: "space-between",
                          }}
                      >
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
              ))}
          </Box>

      </ThemeProvider><Footer /></>

  );
};

export default HomePage;