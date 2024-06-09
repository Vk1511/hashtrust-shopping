import React from "react";
import { Navigate } from "react-router-dom";
import { Authentication } from "../Screens/Authentication";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (isAuthenticated && children.type === Authentication) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && children.type === Authentication) {
    return children;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
