import { FC } from "react";
import styles from "./Dogs.module.scss";
import type { RootState } from "../../../utils/store/store";
import { IDog } from "../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { dogToFavToggle } from "../../../utils/store/favoriteDogsSlice/favoriteDogsSlice";

export const DogCard: FC<IDog> = ({ img, name, age, zip_code, breed, id }) => {
  const favDogs = useSelector((state: RootState) => state.favDogs.dogsList);
  const dispatch = useDispatch();

  const addToFavHandler = () => {
    const dogObj: IDog = {
      img,
      name,
      age,
      zip_code,
      breed,
      id,
    };
    dispatch(dogToFavToggle(dogObj));
  };

  const isDogInFav = (dogs: IDog[]): boolean => {
    const isInside = dogs.find((el) => el.id === id);
    return isInside ? true : false;
  };

  return (
    <div className={styles.dogCard}>
      <div className={styles.dogPhoto}>
        <img src={img} alt={name} />
      </div>
      <button onClick={addToFavHandler} className={styles.addToFav}>
        {isDogInFav(favDogs) ? (
          <AiFillHeart size={24} />
        ) : (
          <AiOutlineHeart size={24} />
        )}
      </button>
      <h3>{name}</h3>
      <span>Age: {age}</span>
      <span>Breed: {breed}</span>
      <p>ZipCode: {zip_code}</p>
    </div>
  );
};
