import { FC, useState } from "react";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { BreedFilter } from "../../components/BreedFilter/BreedFilter";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";
import { Geolocation } from "../../components/Geolocation/Geolocation";
import { DogList } from "../../components/Dogs/DogList";
import { useFetch } from "../../hooks/useFetch";
import { ISortParams } from "../../types/types";

const sizes: number[] = [10, 25, 50, 75, 100];

const sortParams: ISortParams[] = [
  {
    name: "Breed asc",
    value: "breed",
  },
  {
    name: "Breed desc",
    value: "-breed",
  },
  {
    name: "Age asc",
    value: "age",
  },
  {
    name: "Age desc",
    value: "-age",
  },
  {
    name: "Name asc",
    value: "name",
  },
  {
    name: "Name desc",
    value: "-name",
  },
];

export const Main: FC = () => {
  const [chosenBreeds, setChosenBreeds] = useState<string[]>([]);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState(sortParams[0]);
  const [zipCodes, setZipCodes] = useState<string[] | null>([]);

  const { dogs, pageCount } = useFetch({
    sizePerPage,
    zipCodes,
    currentPage,
    chosenBreeds,
    sortBy,
  });

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.filters}>
          <BreedFilter
            chosenBreeds={chosenBreeds}
            setBreedsList={setChosenBreeds}
          />
          <Geolocation setZipCodes={setZipCodes} />
          <div className={styles.dropdown}>
            <SortDropdown
              sortArray={sortParams}
              figure="Sort"
              controlFunction={setSortBy}
              dropdownItem={sortBy.name}
            />
            <SortDropdown
              sortArray={sizes}
              figure="Show"
              controlFunction={setSizePerPage}
              dropdownItem={sizePerPage}
            />
          </div>
        </div>
        <DogList dogs={dogs} />
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event) => setCurrentPage(event.selected)}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </main>
    </>
  );
};
