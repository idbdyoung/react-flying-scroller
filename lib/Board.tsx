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

interface BoardProps {
  style?: CSSProperties;
  gameBoarderColor?: string;
}

const Board: React.FC<BoardProps> = ({ style, gameBoarderColor }) => {
  const { $scrollContainer, gameOptions, gamePlayable } = useScroller();
  const { boardRef, width: boardWidth, height: boardHeight } = useBoard();
  const isAnimationRunning = useRef(false);
  const animationId = useRef<number>();
  const [avatarState, setAvatarState] = useState<AvatarState>({
    locationX: 0,
    flyingEffect: "",
    movingRight: true,
  });
  const initializing = useRef(false);

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
      if (!boardRef.current) return;
      if (initializing.current) return;
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

      if (currentY >= 100) {
        //setY
        currentY--;
        moveAvatar("flyingEffect", `translateY(-${currentY}%)`);
      } else {
        if (count < 40) {
          currentY++;
          moveAvatar("flyingEffect", `translateY(-${currentY}%)`);
        } else if (count > 120) {
          cancelAnimationFrame(animationId.current!);
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
    if (initializing.current) {
      cancelAnimationFrame(animationId.current!);
    }
    if (isAnimationRunning.current) return;
    let animationCount = 0;
    let ratioY = 0;
    const newDestinationX = getDestinationX();

    isAnimationRunning.current = true;
    animationId.current = requestAnimationFrame(() =>
      animate(animationCount, ratioY, avatarState.locationX, newDestinationX!)
    );
  }, [animate, initializing.current]);

  useEffect(() => {
    if (!$scrollContainer || !boardWidth) return;
    $scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      $scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [$scrollContainer, boardWidth]);

  return (
    <div ref={boardRef} style={{ ...defaultStyle, ...style }}>
      {gameOptions && gamePlayable && (
        <div
          style={{
            zIndex: "10",
            position: "absolute",
            top: "0",
            left: `${(window.innerWidth * gameOptions.range.start) / 100}px`,
            width: `${
              (window.innerWidth *
                (gameOptions.range.end - gameOptions.range.start)) /
              100
            }%`,
            borderTop: `${gameOptions.difficulty ?? 2}px solid ${
              gameBoarderColor ?? "red"
            }`,
          }}
        />
      )}
      {gameOptions && gamePlayable && (
        <div
          style={{
            zIndex: "10",
            position: "absolute",
            bottom: "0",
            left: `${Math.floor(
              (window.innerWidth * gameOptions.range.start) / 100
            )}px`,
            width: `${
              (window.innerWidth *
                (gameOptions.range.end - gameOptions.range.start)) /
              100
            }%`,
            borderBottom: `${gameOptions.difficulty ?? 2}px solid ${
              gameBoarderColor ?? "red"
            }`,
          }}
        />
      )}
      <Avatar avatarState={avatarState} height={Math.floor(boardHeight / 2)} />
    </div>
  );
};

export default Board;
