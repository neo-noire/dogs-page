import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./utils/routes/routes";
import { useSelector } from "react-redux";
import { RootState } from "./utils/store/store";
import { useMediaQuery } from "@mui/material";

function App() {
  const matches = useMediaQuery("(max-width:700px)");
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  return (
    <div className={matches && isMenuOpen ? "global noscroll" : "global"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
