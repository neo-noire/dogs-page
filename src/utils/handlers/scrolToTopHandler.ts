type ScrollToTop = () => void;
export const scrollToTopHandler: ScrollToTop = () => {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
    });
}