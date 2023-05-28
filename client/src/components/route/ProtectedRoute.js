import React, { Fragment } from "react";
import { BrowserRouter as Router,
   Route, 
   Routes,
  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>

      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) { 
              return (
              navigate("/login")
              )
            }

            if (isAdmin === true && user.role !== "admin") {

              return (
                navigate("/")
              )
            }
            return <Element {...props} />;
          }}
        />
      )}
    </Fragment>

  );
};

export default ProtectedRoute;
