import React, { FC } from "react";
import styles from "./Dogs.module.scss";
import { IDog } from "../../types/types";

export const DogCard: FC<IDog> = ({ img, name, age, zip_code, breed }) => {
  return (
    <div className={styles.dogCard}>
      <div className={styles.dogPhoto}>
        <img src={img} alt={name} />
      </div>
      <h3>{name}</h3>
      <span>Age: {age}</span>
      <span>Breed: {breed}</span>
      <p>ZipCode: {zip_code}</p>
    </div>
  );
};
