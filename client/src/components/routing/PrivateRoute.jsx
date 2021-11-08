import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useAuth } from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, loadUser } = useAuth();

  useEffectOnce(() => {
    loadUser();
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
