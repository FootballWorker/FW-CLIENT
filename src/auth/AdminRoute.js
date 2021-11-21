import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "./auth-helper.js";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated().user?.role === 'admin' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminRoute;
