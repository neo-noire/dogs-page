import React, { FC } from "react";
import { Logout } from "./Logout";
import { Geolocation } from "./Geolocation/Geolocation";

export const Header: FC = () => {
  return (
    <header>
      <h1>Dogs are best</h1>
      <Geolocation />
      <Logout />
    </header>
  );
};
