import React, { useState, FC } from "react";
import styles from "./SizeFilter.module.scss";

const sizes: number[] = [10, 25, 50, 75, 100];
interface ISizeFilter {
  controlFunction: (value: number) => void;
  dropdownItem: number;
}
export const SortDropdown: FC<ISizeFilter> = ({
  controlFunction,
  dropdownItem,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.sizeFilter}>
      <button onClick={() => setOpen(!open)}>
        Dogs per Page: {dropdownItem}
      </button>
      <div className={open ? `${styles.popup} ${styles.open}` : styles.popup}>
        <ul>
          {sizes.map((el, idx) => (
            <li
              onClick={() => {
                controlFunction(el);
                setOpen(false);
              }}
              key={idx}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
