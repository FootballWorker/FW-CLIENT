import React,{useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import HouseIcon from "@mui/icons-material/House";
import StoreIcon from "@mui/icons-material/Store";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsIcon from "@mui/icons-material/Sports";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";

import auth from "./../../../auth/auth-helper";
import { listUnread } from "./../../../user/api-user";
import { unRead } from "./../../../messanger/api-messanger";
import Logo from "./../../../assets/images/orijinalLogo.png";
import { Button } from "@mui/material";
import config from "../../../config/config";

const drawerWidth = 215;

function UserNavbar() {
  let history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ntfs, setNtfs] = useState([]);
  const [messages, setMessages] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    listUnread({ t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setNtfs(data);
      }
    });
  }, []);

  useEffect(() => {
    unRead({ t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setMessages(data);
      }
    });
  }, []);

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
        <Avatar src={Logo} sx={{ width: 25, height: 25 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", md: "inline" }, color: "#FED829" }}
        >
          Football Worker
        </Typography>
      </Box>
      <Divider />
      <List sx={{ bgcolor: "#51545B" }}>
        {jwt.user && jwt.user.role === "admin" && (
          <Box>
            <Link to={`/users/${jwt.user._id} `}>
              <Tooltip
                disableFocusListener
                title="Visit Your Profile"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <HouseIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Burrow"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/home">
              <Tooltip
                disableFocusListener
                title="Visit Home Page"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Market"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/dashboard">
              <Tooltip
                disableFocusListener
                title="Visit Dashboard"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Dashboard"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/users">
              <Tooltip
                disableFocusListener
                title="See All Users"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Users"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/teams">
              <Tooltip
                disableFocusListener
                title="See All Teams"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Teams"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/all/news">
              <Tooltip
                disableFocusListener
                title="See All News"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <SupportAgentIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="News"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/players">
              <Tooltip
                disableFocusListener
                title="See All Players"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <DirectionsRunIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Players"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/matches">
              <Tooltip
                disableFocusListener
                title="See All Matches"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <SportsIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Matches"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
          </Box>
        )}
        {jwt.user && jwt.user.role === "user" && (
          <Box>
            <Link to={`/users/${jwt.user._id} `}>
              <Tooltip
                disableFocusListener
                title="Visit Your Profile"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <HouseIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Burrow"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to="/home">
              <Tooltip
                disableFocusListener
                title="Visit Home Page"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Market"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            {jwt.user.news && (
              <Link to={jwt.user.news && `/news/${jwt.user.news._id}`}>
                <Tooltip
                  disableFocusListener
                  title="Visit News You Work At"
                  placement="right"
                  arrow
                >
                  <ListItemButton sx={{ color: "#FED829" }}>
                    <ListItemIcon sx={{ color: "#FED829" }}>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: {
                          xs: "none",
                          md: "inline",
                          lg: "inline",
                        },
                      }}
                      primary="Office"
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            )}
            {jwt.user.team && (
              <Link to={jwt.user.team && `/teams/${jwt.user.team._id}`}>
                <Tooltip
                  disableFocusListener
                  title="Visit Team You Work At"
                  placement="right"
                  arrow
                >
                  <ListItemButton sx={{ color: "#FED829" }}>
                    <ListItemIcon sx={{ color: "#FED829" }}>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        display: {
                          xs: "none",
                          md: "inline",
                          lg: "inline",
                        },
                      }}
                      primary="Office"
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            )}
            <Link
              to={
                jwt.user.favoriteTeam && `/teams/${jwt.user.favoriteTeam._id}`
              }
            >
              <Tooltip
                disableFocusListener
                title="Visit Team You Are Member Of"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Team"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to={jwt.user.job && `/jobs/${jwt.user.job._id}`}>
              <Tooltip
                disableFocusListener
                title="Business Area"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Job"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>

            <Link to="/all/news">
              <Tooltip
                disableFocusListener
                title="See All News"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <SupportAgentIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="News"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to={"/messanger/" + jwt.user?._id}>
              <Tooltip
                disableFocusListener
                title="Messanger"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                  <Badge
                      color="warning"
                      badgeContent={messages?.length}
                      max={999}
                    >
                      <MessageIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Messanger"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
            <Link to={"/notifications/by/" + jwt.user._id}>
              <Tooltip
                disableFocusListener
                title="See All Notifications"
                placement="right"
                arrow
              >
                <ListItemButton sx={{ color: "#FED829" }}>
                  <ListItemIcon sx={{ color: "#FED829" }}>
                    <Badge
                      color="warning"
                      badgeContent={ntfs ? ntfs.length : 0}
                      max={999}
                    >
                      <NotificationsIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline",
                        lg: "inline",
                      },
                    }}
                    primary="Notifications"
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
          </Box>
        )}
        <ListItemButton
          sx={{ color: "#FED829" }}
          onClick={() => {
            auth.clearJWT(() => history.push("/"));
          }}
        >
          <ListItemIcon sx={{ color: "#FED829" }}>
            <LogoutIcon sx={{ color: "#FED829" }} />
          </ListItemIcon>
          <ListItemText
            sx={{
              display: {
                xs: "none",
                md: "inline",
                lg: "inline",
              },
            }}
            primary="Go Home"
          />
        </ListItemButton>
      </List>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

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
              gap: 3,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, color: "#FED829" }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/home">
              <Avatar src={Logo} sx={{ width: 35, height: 35 }} />
            </Link>
          </Box>
          <Button
            onClick={() => history.push("/users/" + jwt.user._id)}
            sx={{
              maxWidth: "100%",
              display: {xs:"flex",md:'none'},
              flexDirection: "column",
              borderRadius: "5%",
              color: "#51545b",
              background: "#fed829",
              marginLeft: 3,
              paddingLeft: "30px",
              paddingRight: "30px",
              justifyContent: "center",
              alignItems: "center",
              ":hover":{
                bgcolor:'#fed829'
              }
            }}
          >
            <Typography sx={{fontSize:13}} > {jwt.user && jwt.user.name} </Typography>
            <Typography sx={{fontSize:10}} >
              {jwt.user && jwt.user.job && jwt.user.job.title.toUpperCase()}
            </Typography>
          </Button>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to={"/users/" + jwt.user?._id}
              style={{
                maxWidth: "100%",
                display: "flex",
                borderRadius: "7px",
                color: "#51545b",
                background: "#fed829",
                marginLeft: 3,
                paddingLeft: "30px",
                paddingRight: "30px",
                gap: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar src={config.ServerURI + "/api/users/photo/"+jwt.user?._id} />
              <Box sx={{display: "flex",
                flexDirection: "column",gap: 0.5,
                justifyContent: "center",
                alignItems: "center",marginLeft: 3}} >
              <Typography> {jwt.user && jwt.user.name} </Typography>
              <Typography>
                {jwt.user && jwt.user.job && jwt.user.job.title.toUpperCase()}
              </Typography>
              </Box>
            </Link>
            <Link to={"/messanger/" + jwt.user._id}>
              <Badge color="secondary" badgeContent={messages?.length} max={999}>
                <MessageIcon color="secondary" />
              </Badge>
            </Link>
            <Link to={"/notifications/by/" + jwt.user._id}>
              <Badge
                color="secondary"
                badgeContent={ntfs ? ntfs.length : 0}
                max={999}
              >
                <NotificationsIcon color="secondary" />
              </Badge>
            </Link>
            <IconButton
              onClick={() => {
                auth.clearJWT(() => history.push("/"));
              }}
            >
              <LogoutIcon sx={{ color: "#fed829" }} />
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
                xs: 75,
                md: drawerWidth,
                lg: drawerWidth,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

// UserNavbar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default UserNavbar;
