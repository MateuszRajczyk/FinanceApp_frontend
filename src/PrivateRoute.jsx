import { Outlet, Navigate } from "react-router";
function PrivateRoutes() {
  return localStorage.getItem("isAuthenticated") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoutes;
