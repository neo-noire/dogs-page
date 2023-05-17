import React, { FC } from "react";
import styles from "./BreedFilter.module.scss";

interface IBreedListProps {
  breedsList: string[];
  onClickHandler: (breed: string) => void;
  chosenBreeds: string[];
}
export const BreedList: FC<IBreedListProps> = ({
  breedsList,
  onClickHandler,
  chosenBreeds,
}) => {
  return (
    <ul>
      {breedsList.map((el, idx) => (
        <li
          className={chosenBreeds.includes(el) ? styles.active : ""}
          onClick={() => onClickHandler(el)}
          key={idx}
        >
          {el}
        </li>
      ))}
    </ul>
  );
};
