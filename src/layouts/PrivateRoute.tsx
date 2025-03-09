import { Navigate, Outlet } from "react-router-dom";
const validEmail = import.meta.env.VITE_VALID_EMAIL;
const validPassword = import.meta.env.VITE_VALID_PASSWORD;

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("authentication") ?? "{}");
  if (user.email === validEmail && user.password === validPassword) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
