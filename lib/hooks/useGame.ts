import { useCallback } from "react";
import useScroller from "./useScroller";

const useGame = () => {
  const {
    $scrollContainer,
    gamePlayable,
    startLeft,
    initializing,
    setGamePlayable,
    setStartLeft,
  } = useScroller();

  const playAgain = useCallback(() => {
    if (!$scrollContainer) return;
    $scrollContainer.style.overflowY = "hidden";
    initializing.current = true;

    if (!startLeft) {
      $scrollContainer.scroll({ top: 0, behavior: "smooth" });
    } else {
      $scrollContainer.scroll({
        top: $scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
    setGamePlayable(true);
    setStartLeft(!startLeft);
  }, [$scrollContainer, startLeft]);

  return { gamePlayable, playAgain };
};

export default useGame;
