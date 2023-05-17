import { FC } from "react";
import styles from "./Dogs.module.scss";
import { DogCard } from "./DogCard";
import { IDog } from "../../../types/types";
import MyLoader from "./LoaderCard";

interface IDogListProps {
  dogs: IDog[];
  loading?: boolean;
}
export const DogList: FC<IDogListProps> = ({ dogs, loading }) => {
  if (loading) {
    return (
      <div className={styles.dogs}>
        {" "}
        {Array(10)
          .fill(undefined)
          .map((_, idx) => (
            <MyLoader key={idx} />
          ))}
      </div>
    );
  }
  return (
    <div className={styles.dogs}>
      {dogs.map((dog) => (
        <DogCard key={dog.id} {...dog} />
      ))}
    </div>
  );
};
