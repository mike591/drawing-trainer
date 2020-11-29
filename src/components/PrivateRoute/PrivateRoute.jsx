import React from "react";
import { useAuth } from "hooks/useAuth";
import { publicRoutes } from "utils/routes";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component, ...props }) => {
  const { user } = useAuth();
  const finalComponent = user ? component : publicRoutes.login.component;

  return <Route {...props} component={finalComponent} />;
};

export default PrivateRoute;
