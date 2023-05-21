import { useState } from "react";
import styles from "./SizeFilter.module.scss";
import { ISortParams } from "../../../types/types";

interface ISizeFilter<T> {
  controlFunction: (value: any) => void;
  dropdownItem: number | string;
  figure: string;
  sortArray: T[];
}
export const SortDropdown = <T extends ISortParams | number>({
  controlFunction,
  dropdownItem,
  figure,
  sortArray,
}: ISizeFilter<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.sizeFilter}>
      <button onClick={() => setOpen(!open)}>
        {figure}: {dropdownItem}
      </button>
      <div className={open ? `${styles.popup} ${styles.open}` : styles.popup}>
        <ul>
          {sortArray.map((el, idx) => (
            <li
              onClick={() => {
                controlFunction(el);
                setOpen(false);
              }}
              key={idx}
              className={
                dropdownItem === (typeof el === "number" ? el : el?.name)
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
