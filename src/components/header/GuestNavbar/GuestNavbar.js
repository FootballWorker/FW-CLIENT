import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { animateScroll as scroll } from "react-scroll";

import Logo from "./../../../assets/images/orijinalLogo.png";

const drawerWidth = 215;

const GuestNavbar = (props) => {
  const { window } = props;
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load Departments

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#51545B", height: "100vh" }}>
      <Box
        sx={{
          mt: 3,
          p: 0.5,
          mb: 2,
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Link to="/home">
          <Avatar src={Logo} sx={{ width: 25, height: 25 }} />
        </Link>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "flex" }, color: "#FED829" }}
        >
          Football Workers
        </Typography>
      </Box>
      <Divider />
      <List sx={{ bgcolor: "#51545B" }}>
        <Link to="/contact">
          <Tooltip
            disableFocusListener
            title="Contact Us"
            placement="right"
            arrow
          >
            <ListItemButton sx={{ color: "#FED829" }}>
              <ListItemIcon sx={{ color: "#FED829" }}>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </Tooltip>
        </Link>
        <Link to="/matches">
          <Tooltip
            disableFocusListener
            title="See Matches"
            placement="right"
            arrow
          >
            <ListItemButton sx={{ color: "#FED829" }}>
              <ListItemIcon sx={{ color: "#FED829" }}>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText sx={{}} primary="Matches" />
            </ListItemButton>
          </Tooltip>
        </Link>
        <NavLink to="/" exact>
          <ListItemButton
            sx={{
              bgcolor: "#FED829",
              color: "#51545B",
              ":hover": {
                bgcolor: "$51545B",
                color: "#FED829",
                borderRadius: "2%",
              },
            }}
          >
            <ListItemText primary="Become FW" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/signin" exact>
          <ListItemButton
            sx={{
              bgcolor: "#FED829",
              color: "#51545B",
              ":hover": {
                bgcolor: "$51545B",
                color: "#FED829",
                borderRadius: "2%",
              },
            }}
          >
            <ListItemText primary="Working Again" />
          </ListItemButton>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mt: 8 }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          bgcolor: "#51545b",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link to="/home">
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  height: 40,
                }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    maxHeight: "100%",
                  }}
                />
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 2,
              }}
            >
              <NavLink
                to="/matches"
                exact
                style={{
                  color: "#fed829",
                  fontWeight: "bold",
                  padding: "10px",
                  fontSize: "1.1em",
                  fontFamily: "'Quicksand', sans-serif",
                }}
                activeStyle={{
                  fontWeight: "#51545b",
                  color: "#51545b",
                  backgroundColor: "yellow",
                  borderRadius: "7px",
                }}
              >
                Matches
              </NavLink>
              <NavLink
                to="/"
                exact
                style={{
                  color: "#fed829",
                  fontWeight: "bold",
                  padding: "10px",
                  fontSize: "1.1em",
                  fontFamily: "'Quicksand', sans-serif",
                }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#51545b",
                  backgroundColor: "yellow",
                  borderRadius: "7px",
                }}
                onClick={() => scroll.scrollToTop()}
              >
                Become FW
              </NavLink>
              <NavLink
                to="/signin"
                exact
                style={{
                  color: "#fed829",
                  fontWeight: "bold",
                  padding: "10px",
                  fontSize: "1.1em",
                  fontFamily: "'Quicksand', sans-serif",
                }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#51545b",
                  backgroundColor: "yellow",
                  borderRadius: "7px",
                }}
              >
                Continue to Work
              </NavLink>
            </Box>
            <Button
              sx={{
                color: "#fed829",
                fontWeight: "bold",
                display: { xs: "inline", md: "none" },
              }}
              onClick={() => history.push("/signin")}
            >
              SIGN IN
            </Button>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                color: "#fed829",
                display: { xs: "inline", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: {
                xs: 150,
                sm: drawerWidth,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

GuestNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default GuestNavbar;
