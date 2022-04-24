import useScroller from "./useScroller";

const useGame = () => {
  const {
    $scrollContainer,
    gamePlayable,
    startLeft,
    setGamePlayable,
    setStartLeft,
  } = useScroller();

  const playAgain = () => {
    if ($scrollContainer) $scrollContainer.style.overflowY = "hidden";
    if (startLeft) {
      $scrollContainer?.scroll({ top: 0, behavior: "smooth" });
    } else {
      $scrollContainer?.scroll({
        top: $scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
    setGamePlayable(true);
    setStartLeft(!startLeft);
  };

  return [gamePlayable, playAgain];
};

export default useGame;
