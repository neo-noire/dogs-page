import React, { useState, FC } from "react";
import styles from "./SizeFilter.module.scss";

const sizes: number[] = [10, 25, 50, 75, 100];
interface ISizeFilter<T> {
  controlFunction: (value: any) => void;
  dropdownItem: number | string;
  figure: string;
  sortArray: Array<T>;
}
export const SortDropdown: FC<ISizeFilter<T>> = ({
  controlFunction,
  dropdownItem,
  figure,
  sortArray,
}) => {
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
                dropdownItem === (el.name ? el.name : el) ? styles.choosen : ""
              }
            >
              {el.name ? el.name : el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
