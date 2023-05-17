import { FC, ReactNode } from "react";
import styles from "./BurgerMenu.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

interface IBurgerProps {
  isToggle: boolean;
  children: ReactNode;
  toggleHandler: (arg: boolean) => void;
}

export const BurgerMenu: FC<IBurgerProps> = ({
  isToggle,
  children,
  toggleHandler,
}) => {
  const openMenuHandler = () => {
    toggleHandler(!isToggle);
  };
  return (
    <AnimatePresence>
      {isToggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.bgMobile}
        >
          <motion.div
            initial={{ right: "-200vw" }}
            animate={{ right: 0 }}
            exit={{ right: "-200vw" }}
            transition={{ duration: 0.7 }}
            className={styles.slideBlock}
          >
            <button onClick={openMenuHandler} className={styles.close}>
              <AiOutlineClose size={24} />
            </button>
            <div className={styles.mainContent}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
