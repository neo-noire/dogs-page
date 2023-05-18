import { FC } from "react";
import { Logout } from "./Logout";
import { NavLink } from "react-router-dom";
import { ReactComponent as Dog } from "../../../assets/dog2.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RxHamburgerMenu } from "react-icons/rx";
import s from "./Header.module.scss";
import { BurgerMenu } from "../../ui/BurgerMenu/BurgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store/store";
import { toggleMenu } from "../../../utils/store/menuStateSlice/menuStateSlice";

export const Header: FC = () => {
  const matches = useMediaQuery("(min-width:700px)");
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  const handleMobileMenu = () => {
    dispatch(toggleMenu());
  };
  return (
    <>
      <header>
        <NavLink to={"/"} className={s.logo}>
          <Dog />
          <div className={s.slogan}>
            Friend
            <span>Get yourself a paw</span>
          </div>
        </NavLink>
        {matches ? (
          <nav>
            <NavLink to={"/"}>Main</NavLink>
            <NavLink to={"/favorite"}>Favorite</NavLink>
            <Logout />
          </nav>
        ) : (
          <button onClick={handleMobileMenu} className={s.burgerBtn}>
            <RxHamburgerMenu size={24} />
          </button>
        )}
      </header>
      {!matches && (
        <BurgerMenu isToggle={isMenuOpen} toggleHandler={handleMobileMenu}>
          <nav className={s.mobileMenu}>
            <NavLink onClick={handleMobileMenu} to={"/"}>
              Main
            </NavLink>
            <NavLink onClick={handleMobileMenu} to={"/favorite"}>
              Favorite
            </NavLink>
            <Logout />
          </nav>
        </BurgerMenu>
      )}
    </>
  );
};
