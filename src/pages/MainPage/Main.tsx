import { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { ISortParams } from "../../types/types";
import { BreedFilter } from "../../components/ui/BreedFilter/BreedFilter";
import { SortDropdown } from "../../components/ui/SortDropdown/SortDropdown";
import { DogList } from "../../components/ui/Dogs/DogList";
import { Geolocation } from "../../components/ui/Geolocation/Geolocation";

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

  const { dogs, pageCount, loading } = useFetch({
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
          <BreedFilter setBreedsList={setChosenBreeds} />
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
        <DogList loading={loading} dogs={dogs} />
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event) => setCurrentPage(event.selected)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </main>
    </>
  );
};
