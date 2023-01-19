import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  isAuthenticated = true;
  value; 
  console.log(children);
  const { isAuthenticated } = useAuthContext(Date.now());
  console.log("Protected root");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
