import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Auth } from "../../pages/Auth/Auth";
import { FavPage } from "../../pages/FavPage/FavPage";
import { Main } from "../../pages/MainPage/Main";
// import { ParentLayout } from "../../components/Layout/ParentLayout";

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
    errorElement: <div>error</div>,
  },




]);

export default router;
