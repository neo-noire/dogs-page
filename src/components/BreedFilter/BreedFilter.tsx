import React, { useState, useEffect, FC } from "react";
import styles from "./BreedFilter.module.scss";
import fetchRequest from "../../axios/axios";
import { BiDownArrow } from "react-icons/bi";

interface IBreedFilterProps {
  setBreedsList: (arg: string[]) => void;
  chosenBreeds: string[];
}

export const BreedFilter: FC<IBreedFilterProps> = ({
  setBreedsList,
  chosenBreeds,
}) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [searchBreeds, setSearchBreeds] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const { data: breeds } = await fetchRequest<string[]>(`/dogs/breeds`);
        setAllBreeds(breeds);
      } catch (error) {
        console.log(error);
      }
    };

    getBreeds();
  }, []);

  useEffect(() => {
    const searchHandler = (text: string) => {
      if (text.length > 0) {
        setSearchBreeds(
          allBreeds.filter((el) =>
            el.toLowerCase().includes(text.toLowerCase())
          )
        );
      } else {
        setSearchBreeds([...allBreeds]);
      }
    };
    searchHandler(inputText);
  }, [inputText]);

  const chooseBreedsHandler = (breed: string) => {
    const breedsArr = [...new Set([...chosenBreeds, breed])];
    setBreedsList(breedsArr);
  };

  const searchBreedsHandler = (breed: string) => {
    chooseBreedsHandler(breed);
    setInputText("");
  };

  const removeBreedFromQueryHandler = (breed: string) => {
    const filteredBreedArr = chosenBreeds.filter((el) => el !== breed);
    setBreedsList(filteredBreedArr);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.search}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
            type="text"
            placeholder="Search by Bread Name"
          />
        </div>
        <button
          onClick={() => {
            setOpen(!open);
            setInputText("");
          }}
        >
          All Breeds <BiDownArrow />
        </button>
      </div>
      <div className={styles.listOfBreeds}>
        {chosenBreeds.map((el, idx) => (
          <div className={styles.selectedBreed} key={el}>
            {el}
            <button onClick={() => removeBreedFromQueryHandler(el)}>x</button>
          </div>
        ))}
      </div>
      {inputText.length > 0 ? (
        <div className={`${styles.popup} ${styles.open}`}>
          <ul>
            {searchBreeds.map((el, idx) => (
              <li
                className={chosenBreeds.includes(el) ? styles.active : ""}
                onClick={() => searchBreedsHandler(el)}
                key={idx}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={open ? `${styles.popup} ${styles.open}` : styles.popup}>
          <ul>
            {allBreeds.map((el, idx) => (
              <li
                className={chosenBreeds.includes(el) ? styles.active : ""}
                onClick={() => chooseBreedsHandler(el)}
                key={idx}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
