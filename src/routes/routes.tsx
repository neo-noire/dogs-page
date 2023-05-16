import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Main } from "../pages/MainPage/Main";
import { Auth } from "../pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
    ],
  },
]);

export default router;
