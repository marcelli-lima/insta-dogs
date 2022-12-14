import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirect = "/login", children }) => {
  const { login } = useContext(UserContext);

  if (login === true) return children;
  else if (login === false) return <Navigate to={redirect} />;
  else return null;
};

export default ProtectedRoute;
