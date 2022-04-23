import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useBoard from "./hooks/useBoard";
import useScroller from "./hooks/useScroller";

import Avatar from "./Avatar";

export type AvatarState = {
  locationX: number;
  flyingEffect: string;
  movingRight: boolean;
};

const defaultStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100px",
  overflowY: "scroll",
  position: "relative",
};

const Board = ({ style }: { style?: CSSProperties }) => {
  const { $scrollContainer } = useScroller();
  const { boardRef, width: boardWidth, height: boardHeight } = useBoard();
  const isAnimationRunning = useRef(false);
  const animationId = useRef<number>();
  const [avatarState, setAvatarState] = useState<AvatarState>({
    locationX: 0,
    flyingEffect: "",
    movingRight: true,
  });

  const moveAvatar = useCallback(
    <T extends keyof AvatarState>(prop: T, value: AvatarState[T]) =>
      setAvatarState((prevState) => ({
        ...prevState,
        [prop]: value,
      })),
    []
  );

  const getDestinationX = useCallback(() => {
    if (!$scrollContainer) return;
    const { scrollTop, clientHeight, scrollHeight } = $scrollContainer;

    return Math.floor((scrollTop / (scrollHeight - clientHeight)) * boardWidth);
  }, [$scrollContainer, boardWidth]);

  const animate = useCallback(
    (
      count: number,
      currentY: number,
      currentX: number,
      currentDestinationX: number
    ) => {
      if (count >= 150) {
        moveAvatar("locationX", currentDestinationX);
        cancelAnimationFrame(animationId.current!);
        isAnimationRunning.current = false;
        return;
      }
      count++;
      const newDestinationX = getDestinationX();

      //setX
      if (currentDestinationX !== newDestinationX) {
        if (currentDestinationX < newDestinationX!) {
          moveAvatar("movingRight", true);
        } else {
          moveAvatar("movingRight", false);
        }
        currentDestinationX = newDestinationX!;
        count = 30;
      }
      currentX += ((currentDestinationX - currentX) * count) / 1500;
      moveAvatar("locationX", currentX);

      //setY
      if (currentY >= 100) {
        currentY--;
        moveAvatar("flyingEffect", `translateY(-${currentY}%)`);
      } else {
        if (count < 40) {
          currentY++;
          moveAvatar("flyingEffect", `translateY(-${currentY}%)`);
        } else if (count > 120) {
          moveAvatar("flyingEffect", "");
        } else {
          currentY--;
          moveAvatar("flyingEffect", `translateY(-${currentY}%)`);
        }
      }
      animationId.current = requestAnimationFrame(() =>
        animate(count, currentY, currentX, currentDestinationX)
      );
    },
    [getDestinationX]
  );

  const handleScroll = useCallback(() => {
    if (!isAnimationRunning.current) {
      let animationCount = 0;
      let ratioY = 0;
      const newDestinationX = getDestinationX();

      isAnimationRunning.current = true;
      animationId.current = requestAnimationFrame(() =>
        animate(animationCount, ratioY, avatarState.locationX, newDestinationX!)
      );
    }
  }, [animate, avatarState.locationX]);

  useEffect(() => {
    if (!$scrollContainer || !boardWidth) return;
    $scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      $scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [$scrollContainer, boardWidth, avatarState.locationX]);

  return (
    <div ref={boardRef} style={{ ...defaultStyle, ...style }}>
      <Avatar avatarState={avatarState} height={Math.floor(boardHeight / 2)} />
    </div>
  );
};

export default Board;
