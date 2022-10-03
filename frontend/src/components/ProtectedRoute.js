import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
