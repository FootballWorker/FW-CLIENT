import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";


import GuestNavbar from '../components/header/GuestNavbar/GuestNavbar';
import UserNavbar from '../components/header/UserNavbar/UserNavbar';



import auth from "./../auth/auth-helper";

const Menu = withRouter(({ history }) => (
  <div>{auth.isAuthenticated() ? <UserNavbar /> : <GuestNavbar />}</div>
));

export default Menu;
