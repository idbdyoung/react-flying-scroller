import useScroller from "./useScroller";

const useDirectScroll = (name) => {
  const { $scrollContainer, directPoints } = useScroller();

  return () => {
    $scrollContainer.scroll({
      top: directPoints[name],
      behavior: "smooth",
    });
  };
};

export default useDirectScroll;
