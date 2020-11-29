import React from "react";
import { useAuth } from "hooks/useAuth";
import { Redirect } from "react-router-dom";

const LogoutPage = () => {
  const { handleLogout } = useAuth();
  handleLogout();
  return <Redirect to="/" />;
};

export default LogoutPage;
