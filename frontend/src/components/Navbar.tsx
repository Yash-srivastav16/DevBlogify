import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Tabs, Tab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation(); 

  const getTabIndex = (path: string) => {
    if (path === "/add-blog") return 1;
    if (path === "/about") return 2;
    return 0; 
  };
  const [selectedTab, setSelectedTab] = useState(getTabIndex(location.pathname));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setSelectedTab(getTabIndex(location.pathname)); // Update tab when route changes
  }, [location.pathname]); 

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
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

        {isMobile ? (
          <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs
            value={selectedTab}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="navigation tabs"
          >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Add Blog" component={Link} to="/add-blog" />
            <Tab label="About Developer" component={Link} to="/about" />
          </Tabs>
        )}
      </Toolbar>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <List>
        <ListItem component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/add-blog">
        <ListItemText primary="Add Blog" />
      </ListItem>
      <ListItem component={Link} to="/about">
        <ListItemText primary="About Developer" />
      </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
