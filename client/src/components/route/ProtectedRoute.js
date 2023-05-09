import React, { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Routes>

      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              navigate("/login");
            }

            if (isAdmin === true && user.role !== "admin") {
              navigate("/");
            }
            return <Element {...props} />;
          }}
        />
      )}
    </Routes>

  );
};

export default ProtectedRoute;
