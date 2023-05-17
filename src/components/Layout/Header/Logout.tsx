import { useNavigate } from "react-router-dom";
import fetchRequest from "../../../utils/axios/axios";

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
