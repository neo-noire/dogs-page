import React, { FC, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import fetchRequest from "../../axios/axios";
import { DogCard } from "../../components/DogCard";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { BreedFilter } from "../../components/BreedFilter/BreedFilter";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";

interface IDogsData {
  next?: string;
  prev?: string;
  resultIds: string[];
  total: number;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const Main: FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [chosenBreeds, setChosenBreeds] = useState<string[]>([]);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchDogsList = async () => {
      try {
        const from =
          currentPage > 0 ? `&from=${currentPage * sizePerPage}` : "";
        const breedQuery = chosenBreeds.map((el) => `&breeds=${el}`).join("");
        const size = `&size=${sizePerPage}`;
        const { data } = await fetchRequest(
          `/dogs/search?${size}${breedQuery}${from}`
        );
        setPageCount(data.total / sizePerPage);
        const dogsIds = data.resultIds;
        const res = await fetchRequest.post("/dogs", dogsIds);
        setDogs(res.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDogsList();
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [chosenBreeds, sizePerPage, currentPage]);

  return (
    <>
      <Header />
      <main>
        <div className="filters">
          <BreedFilter
            chosenBreeds={chosenBreeds}
            setBreedsList={setChosenBreeds}
          />
          <SortDropdown
            controlFunction={setSizePerPage}
            dropdownItem={sizePerPage}
          />
        </div>
        <div className="dogs">
          {dogs.map((dog) => (
            <DogCard key={dog.id} {...dog} />
          ))}
        </div>
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
