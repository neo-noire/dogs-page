import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "./Header/Header";

export const Layout = () => {
  useAuth();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
