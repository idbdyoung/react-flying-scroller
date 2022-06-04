import useScroller from "./useScroller";

const useDirectScroll = () => {
  const { $scrollContainer, directPoints } = useScroller();

  return (name: string) => {
    $scrollContainer?.scroll({
      top: directPoints[name],
      behavior: "smooth",
    });
  };
};

export default useDirectScroll;
