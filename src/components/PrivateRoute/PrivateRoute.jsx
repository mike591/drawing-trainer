import React from "react";
import { useAuth } from "hooks/useAuth";
import LoginPage from "components/LoginPage";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component, ...props }) => {
  const { user } = useAuth();
  const finalComponent = user ? component : LoginPage;

  return <Route {...props} component={finalComponent} />;
};

export default PrivateRoute;
