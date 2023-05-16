import React, { FC, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import fetchRequest from "../../axios/axios";
import { DogCard } from "../../components/DogCard";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { BreedFilter } from "../../components/BreedFilter/BreedFilter";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router";

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
const sizes: number[] = [10, 25, 50, 75, 100];
const sortParams = [
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
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [chosenBreeds, setChosenBreeds] = useState<string[]>([]);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState(sortParams[0]);

  useEffect(() => {
    const fetchDogsList = async () => {
      try {
        const from =
          currentPage > 0 ? `&from=${currentPage * sizePerPage}` : "";
        const breedQuery = chosenBreeds.map((el) => `&breeds=${el}`).join("");
        const size = `&size=${sizePerPage}`;
        const order = sortBy.value.includes("-") ? "desc" : "asc";
        const sort = `&sort=${sortBy.value.split("-").join("")}:`;

        const { data } = await fetchRequest(
          `/dogs/search?${size}${breedQuery}${from}${sort}${order}`
        );
        setPageCount(data.total / sizePerPage);
        const dogsIds = data.resultIds;
        const res = await fetchRequest.post("/dogs", dogsIds);
        setDogs(res.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
        }
        console.log(error);
      }
    };

    fetchDogsList();
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [chosenBreeds, sizePerPage, currentPage, sortBy]);

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
            sortArray={sortParams}
            figure="Sort by"
            controlFunction={setSortBy}
            dropdownItem={sortBy.name}
          />
          <SortDropdown
            sortArray={sizes}
            figure="Dogs per Page"
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
