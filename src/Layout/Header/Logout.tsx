import React from "react";
import fetchRequest from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await fetchRequest.post("/auth/logout");
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={logOutHandler}>LogOut</button>;
};
