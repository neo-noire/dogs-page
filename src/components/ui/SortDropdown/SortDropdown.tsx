import { useState } from "react";
import styles from "./SizeFilter.module.scss";
import { ISortParams } from "../../../types/types";

export interface ISizeFilter<T> {
  controlFunction: (value: T) => void;
  choosenItem: number | string;
  figure: string;
  sortArray: T[];
}
export const SortDropdown = <T extends ISortParams | number>({
  controlFunction,
  choosenItem,
  figure,
  sortArray,
}: ISizeFilter<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.sizeFilter}>
      <button
        aria-label="sort-open"
        data-testid="sort-open"
        onClick={() => setOpen(!open)}
      >
        {figure}: {choosenItem}
      </button>
      <div
        data-testid="dropdown-list"
        className={open ? `${styles.popup} ${styles.open}` : styles.popup}
      >
        <ul>
          {sortArray.map((el, idx) => (
            <li
              onClick={() => {
                controlFunction(el);
                setOpen(false);
              }}
              key={idx}
              className={
                choosenItem === (typeof el === "number" ? el : el?.name)
                  ? styles.choosen
                  : ""
              }
            >
              {typeof el === "number" ? el : el?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
