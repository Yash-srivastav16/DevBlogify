import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
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
            style={{ height: "60px", marginRight: "10px" }}
          />
          DevBlogify
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
