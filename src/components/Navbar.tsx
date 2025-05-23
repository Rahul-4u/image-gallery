"use client";

import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Gallery", path: "/gallery" },
  { title: "Upload", path: "/upload" },
  { title: "About", path: "/about" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <Box
        // className=" sticky top-0 z-50"
        sx={{ bgcolor: "info.main" }}
      >
        <AppBar
          position="static"
          sx={{ bgcolor: "info.main", boxShadow: "none", border:'none' }}
          className="max-w-[1440px] mx-auto bg-sky-700 shadow-none"
        >
          <Toolbar>
            {/* Logo / Title */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                Image Gallery
              </Link>
            </Typography>

            {/* Desktop Nav Links */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  color="inherit"
                  component={Link}
                  href={link.path}
                >
                  {link.title}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component={Link} href={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
