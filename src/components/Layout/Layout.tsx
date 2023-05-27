import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header/Header";

export const Layout = () => {
  const isAuth = sessionStorage.getItem("isAuth")

  if (isAuth !== "true") {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
