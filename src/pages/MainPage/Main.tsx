import { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Main.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { ISortParams } from "../../types/types";
import { BreedFilter } from "../../components/ui/BreedFilter/BreedFilter";
import { SortDropdown } from "../../components/ui/SortDropdown/SortDropdown";
import { DogList } from "../../components/ui/Dogs/DogList";
import { Geolocation } from "../../components/ui/Geolocation/Geolocation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import { setCurrentPage, updateDogsPerPageFilter, updateSorByFilter } from "../../utils/store/dogsListSlice/dogsListSlice";
import { scrollToTopHandler } from "../../utils/handlers/scrolToTopHandler";


export const Main: FC = () => {
  const dogsStore = useSelector((store: RootState) => store.mainDogsCache)
  const dispatch = useDispatch();
  const [zipCodes, setZipCodes] = useState<string[] | null>([]);

  const { loading } = useFetch({ zipCodes });

  const pageHandler = (e: number) => {
    dispatch(setCurrentPage(e))
  }

  const setSortByHandler = (e: ISortParams) => {
    dispatch(updateSorByFilter(e))
  }
  const setDogsPerPageHandler = (e: number) => {
    dispatch(updateDogsPerPageFilter(e))
  }

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.filters}>
          <BreedFilter />
          <Geolocation setZipCodes={setZipCodes} />
          <div className={styles.dropdown}>
            <SortDropdown
              sortArray={dogsStore.sortBy.sortList}
              figure="Sort"
              controlFunction={setSortByHandler}
              choosenItem={dogsStore.sortBy.chosenItem.name}
            />
            <SortDropdown
              sortArray={dogsStore.dogsPerPage.sortList}
              figure="Show"
              controlFunction={setDogsPerPageHandler}
              choosenItem={dogsStore.dogsPerPage.chosenItem}
            />
          </div>
        </div>
        <DogList loading={loading} dogs={dogsStore.dogsArray} />
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          initialPage={dogsStore.currentPage}
          onPageChange={(event) => {
            pageHandler(event.selected)
            scrollToTopHandler()
          }}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={dogsStore.totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </main>
    </>
  );
};
