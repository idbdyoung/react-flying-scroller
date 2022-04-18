import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useBoard from "./hooks/useBoard";
import useScroller from "./hooks/useScroller";
import Avatar from "./Avatar";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background: red;
`;

const Board = ({ style }) => {
  const { $scrollBox } = useScroller();
  const { boardRef, width: boardWidth, height: boardHeight } = useBoard();
  const isAnimationRunning = useRef(false);
  const animationId = useRef(null);
  const [avatarState, setAvatarState] = useState({
    locationX: 0,
    flyingEffect: "",
    movingRight: true,
  });

  const moveAvatar = useCallback(
    (prop, value) =>
      setAvatarState((prevState) => ({
        ...prevState,
        [prop]: value,
      })),
    []
  );

  const getDestinationX = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = $scrollBox;

    return Math.floor(
      (scrollTop / (scrollHeight - clientHeight)) * (boardWidth - 30)
    );
  }, [$scrollBox, boardWidth]);

  const animate = useCallback(
    (count, currentY, currentX, currentDestinationX) => {
      if (count >= 150) {
        moveAvatar("locationX", currentDestinationX);
        cancelAnimationFrame(animationId.current);
        isAnimationRunning.current = false;
        return;
      }
      count++;
      const newDestinationX = getDestinationX();

      //setX
      if (currentDestinationX !== newDestinationX) {
        if (currentDestinationX < newDestinationX) {
          moveAvatar("movingRight", true);
        } else {
          moveAvatar("movingRight", false);
        }
        currentDestinationX = newDestinationX;
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
        animate(animationCount, ratioY, avatarState.locationX, newDestinationX)
      );
    }
  }, [animate, avatarState.locationX]);

  useEffect(() => {
    if (!$scrollBox || !boardWidth) return;
    $scrollBox.addEventListener("scroll", handleScroll);

    return () => {
      $scrollBox?.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [$scrollBox, boardWidth, avatarState.locationX]);

  return (
    <Container ref={boardRef} style={style}>
      <Avatar avatarState={avatarState} height={Math.floor(boardHeight / 2)} />
    </Container>
  );
};

export default Board;
