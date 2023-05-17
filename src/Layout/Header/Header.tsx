import React, { FC, useState } from "react";
import { Logout } from "./Logout";
import { NavLink } from "react-router-dom";
import { ReactComponent as Dog } from "../../assets/dog2.svg";
import { BurgerMenu } from "../../components/BurgerMenu/BurgerMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RxHamburgerMenu } from "react-icons/rx";
import s from "./Header.module.scss";

export const Header: FC = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [openMobile, setOpenMobile] = useState(false);
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
          <button onClick={() => setOpenMobile(true)} className={s.burgerBtn}>
            <RxHamburgerMenu size={24} />
          </button>
        )}
      </header>
      {!matches && (
        <BurgerMenu isToggle={openMobile} toggleHandler={setOpenMobile}>
          <nav className={s.mobileMenu}>
            <NavLink onClick={() => setOpenMobile(false)} to={"/"}>
              Main
            </NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to={"/favorite"}>
              Favorite
            </NavLink>
            <Logout />
          </nav>
        </BurgerMenu>
      )}
    </>
  );
};
