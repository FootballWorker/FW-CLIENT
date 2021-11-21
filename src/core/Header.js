import React  from 'react'

import GuestNavbar from '../components/header/GuestNavbar/GuestNavbar';
import UserNavbar from '../components/header/UserNavbar/UserNavbar';

import auth from './../auth/auth-helper'

const Header = () => {
  return (
    <>
      {auth.isAuthenticated() ? (
        <UserNavbar />
        ) : (
        <GuestNavbar/>
      )}
    </>
  );
};

export default Header
