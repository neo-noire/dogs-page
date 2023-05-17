import React, { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../pages/FavPage/FavPage.module.scss";

interface IModalProps {
  isToggle: boolean;
  children: ReactNode;
  toggleHandler?: (arg: boolean) => void;
}
export const Modal: FC<IModalProps> = ({
  isToggle,
  children,
  toggleHandler,
}) => {
  return (
    <AnimatePresence>
      {isToggle && (
        <motion.div
          onClick={() => toggleHandler(false)}
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.center}>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
