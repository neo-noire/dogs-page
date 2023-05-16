import { FC, useEffect, useState } from "react";
import { Header } from "../../Layout/Header/Header";
import fetchRequest from "../../axios/axios";
import axios, { AxiosError } from "axios";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { BreedFilter } from "../../components/BreedFilter/BreedFilter";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router";
import { Geolocation } from "../../components/Geolocation/Geolocation";
import { DogList } from "../../components/Dogs/DogList";
import { IDog, IDogsIdsList } from "../../types/types";

const sizes: number[] = [10, 25, 50, 75, 100];
interface ISortParams {
  name: string;
  value: string;
}
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
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<IDog[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [chosenBreeds, setChosenBreeds] = useState<string[]>([]);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState(sortParams[0]);
  const [zipCodes, setZipCodes] = useState<string[] | null>([]);

  useEffect(() => {
    const fetchDogsList = async () => {
      const zip_code =
        zipCodes && zipCodes?.length > 0
          ? `&zipCodes=${zipCodes.join("&zipCodes=")}`
          : "";
      const from = currentPage > 0 ? `&from=${currentPage * sizePerPage}` : "";
      const breedQuery = chosenBreeds.map((el) => `&breeds=${el}`).join("");
      const size = `&size=${sizePerPage}`;
      const order = sortBy.value.includes("-") ? "desc" : "asc";
      const sort = `&sort=${sortBy.value.split("-").join("")}:`;

      try {
        const { data: dogsIdsResult } = await fetchRequest<IDogsIdsList>(
          `/dogs/search?${size}${breedQuery}${from}${sort}${order}${zip_code}`
        );
        setPageCount(dogsIdsResult.total / sizePerPage);
        const dogsIds = dogsIdsResult.resultIds;
        const { data: dogs } = await fetchRequest.post<IDog[]>(
          "/dogs",
          dogsIds
        );
        setDogs(dogs);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 401) {
            navigate("/login");
          }
        } else {
          console.error(error);
        }
      }
    };

    fetchDogsList();
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [chosenBreeds, sizePerPage, currentPage, sortBy, zipCodes]);

  return (
    <>
      <Header />
      <main>
        <div className="filters">
          <BreedFilter
            chosenBreeds={chosenBreeds}
            setBreedsList={setChosenBreeds}
          />
          <Geolocation setZipCodes={setZipCodes} />
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
