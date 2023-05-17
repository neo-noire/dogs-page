import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Main } from "../pages/MainPage/Main";
import { Auth } from "../pages/Auth/Auth";
import { FavPage } from "../pages/FavPage/FavPage";

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
        path: "/favorite",
        element: <FavPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);

export default router;
