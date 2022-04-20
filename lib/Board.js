import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import useBoard from "./hooks/useBoard";
import useScroller from "./hooks/useScroller";
import getStyle from "./getStyle";
import Avatar from "./Avatar";

const Board = ({ style }) => {
  const { $scrollContainer } = useScroller();
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
    const { scrollTop, clientHeight, scrollHeight } = $scrollContainer;

    return Math.floor((scrollTop / (scrollHeight - clientHeight)) * boardWidth);
  }, [$scrollContainer, boardWidth]);

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
    if (!$scrollContainer || !boardWidth) return;
    $scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      $scrollContainer?.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [$scrollContainer, boardWidth, avatarState.locationX]);

  return (
    <div ref={boardRef} style={{ ...getStyle("board"), ...style }}>
      <Avatar avatarState={avatarState} height={Math.floor(boardHeight / 2)} />
    </div>
  );
};

Board.propTypes = {
  style: PropTypes.object,
};

export default Board;
