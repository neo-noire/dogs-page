import { useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import { DogList } from "../../components/ui/Dogs/DogList";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IDog } from "../../types/types";
import styles from "./FavPage.module.scss";
import fetchRequest from "../../utils/axios/axios";
import { Modal } from "../../components/ui/Modal/Modal";
import { DogCard } from "../../components/ui/Dogs/DogCard";

interface Match {
  match: string;
}
export const FavPage = () => {
  const favDogs = useSelector((state: RootState) => state.favDogs.dogsList);
  const [match, setMatch] = useState<IDog[]>([]);
  const [toggle, setToggle] = useState(true);
  if (favDogs.length === 0) {
    return (
      <main className={styles.empty}>
        <h1>You do not have Favorite Dogs</h1>
        <p>
          Let's go and find some <NavLink to={"/"}>friend for You</NavLink>{" "}
        </p>
      </main>
    );
  }

  const matchDogHandler = async () => {
    const ids = favDogs.map((el) => el.id);
    const { data } = await fetchRequest.post<Match>("/dogs/match", ids);
    setMatch(favDogs.filter((el) => el.id === data.match));
    setToggle(true);
    console.log(match);
  };
  return (
    <main>
      <button className={styles.matchBtn} onClick={() => matchDogHandler()}>
        Make Match
      </button>
      {match.length !== 0 && (
        <Modal toggleHandler={setToggle} isToggle={toggle}>
          <h3>Congratulations </h3>
          <p>{match[0].name} is Your Perfect Match!!</p>
          <div className={styles.dogs}>
            <DogCard {...match[0]} />
          </div>
        </Modal>
      )}

      <DogList dogs={favDogs} />
    </main>
  );
};
