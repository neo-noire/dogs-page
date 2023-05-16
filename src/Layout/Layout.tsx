import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Layout = () => {
  useAuth();
  return (
    <>
      <Outlet />
    </>
  );
};
