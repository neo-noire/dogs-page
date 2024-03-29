import React, { FC, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import styles from "./Auth.module.scss";
import { useValidate } from "../../hooks/useValidate";
import fetchRequest from "../../utils/axios/axios";

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
    if (valid) {
      const userData: IUserData = {
        name,
        email,
      };
      try {
        await fetchRequest.post<string>("/auth/login", userData);
        sessionStorage.setItem("isAuth", "true")
        navigate("/");
      } catch (error: AxiosError | any) {
        setError(error.message);
      }
    }
  };
  const [helper, valid] = useValidate(email);

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Try again!</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h2>Login</h2>
        <form className={styles.login} onSubmit={registerHandler}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="name"
            required={true}
          />
          <label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
              placeholder="email"
              required={true}
              className={valid ? styles.valid : styles.invalid}
            />
            <span className={valid ? styles.valid : styles.invalid}>
              {helper}
            </span>
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
