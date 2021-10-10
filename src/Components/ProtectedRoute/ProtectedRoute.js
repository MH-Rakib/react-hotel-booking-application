import React, { useContext } from "react";
import { Redirect } from "react-router";
import { userContext } from "./../../App";
import { Route } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const { user } = useContext(userContext);
  const [loggedInUser, setLoggedInUser] = user;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.isSigned ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
