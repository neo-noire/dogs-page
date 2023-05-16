import React, { FC, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import fetchRequest from "../axios/axios";
import { useNavigate } from "react-router-dom";
import "../App.scss";

interface IUserData {
  name: string;
  email: string;
}

export const Auth: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: IUserData = {
      name,
      email,
    };
    try {
      await fetchRequest.post<string>("/auth/login", userData);
      navigate("/");
    } catch (error: AxiosError | any) {
      setError(error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <form className="login" onSubmit={registerHandler}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="name"
          required={true}
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="email"
          required={true}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
