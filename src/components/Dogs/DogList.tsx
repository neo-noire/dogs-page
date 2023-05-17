import { FC } from "react";
import styles from "./Dogs.module.scss";
import { DogCard } from "./DogCard";
import { IDog } from "../../types/types";

interface IDogListProps {
  dogs: IDog[];
}
export const DogList: FC<IDogListProps> = ({ dogs }) => {
  return (
    <div className={styles.dogs}>
      {dogs.map((dog) => (
        <DogCard key={dog.id} {...dog} />
      ))}
    </div>
  );
};
