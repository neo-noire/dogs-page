import React, { FC } from "react";
import { Logout } from "./Logout";

export const Header: FC = () => {
  return (
    <header>
      <h1>Dogs are best</h1>
      <input placeholder="search" />
      <Logout />
    </header>
  );
};
