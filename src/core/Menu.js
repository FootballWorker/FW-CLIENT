import React from "react";
import { withRouter } from "react-router-dom";



import GuestNavbar from '../components/header/GuestNavbar/GuestNavbar';
import UserNavbar from '../components/header/UserNavbar/UserNavbar';



import auth from "./../auth/auth-helper";

const Menu = withRouter(({ history }) => (
  <div>{auth.isAuthenticated() ? <UserNavbar /> : <GuestNavbar />}</div>
));

export default Menu;
