import React, { useEffect, useRef } from "react";

import useScroller from "./hooks/useScroller";

import type { AvatarState } from "./Board";

interface AvatarProps {
  avatarState: AvatarState;
  height: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatarState, height }) => {
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const { locationX, flyingEffect, movingRight } = avatarState;
  const {
    avatarImage,
    $scrollContainer,
    gameOptions,
    gamePlayable,
    startLeft,
    registAvatarWidth,
    setGamePlayable,
  } = useScroller();
  const initializing = useRef(false);

  useEffect(() => {
    if (avatarContainerRef.current) {
      if (gameOptions && gamePlayable) {
        if (startLeft && !initializing.current) {
          if (
            gamePlayable &&
            Number(avatarContainerRef.current.style.left.split("px")[0]) >
              Math.floor((gameOptions.range.end / 100) * window.innerWidth)
          ) {
            setGamePlayable(false);
            alert("클리어");
          }
        } else {
          if (
            gamePlayable &&
            Number(avatarContainerRef.current.style.left.split("px")[0]) + 30 <
              Math.floor((gameOptions.range.start / 100) * window.innerWidth)
          ) {
            setGamePlayable(false);
            alert("클리어");
          }
        }

        if (startLeft) {
          if (
            Number(avatarContainerRef.current.style.left.split("px")[0]) <=
              Math.floor((gameOptions.range.start / 100) * window.innerWidth) &&
            !avatarContainerRef.current.style.transform.includes("translateY")
          ) {
            initializing.current = false;
            if ($scrollContainer) $scrollContainer.style.overflowY = "scroll";
          }
        } else {
          if (
            Number(avatarContainerRef.current.style.left.split("px")[0]) >=
              Math.floor((gameOptions.range.end / 100) * window.innerWidth) &&
            !avatarContainerRef.current.style.transform.includes("translateY")
          ) {
            initializing.current = false;
            if ($scrollContainer) $scrollContainer.style.overflowY = "scroll";
          }
        }

        if (
          !initializing.current &&
          Number(avatarContainerRef.current.style.left.split("px")[0]) >
            Math.floor((gameOptions.range.start / 100) * window.innerWidth) &&
          Number(avatarContainerRef.current.style.left.split("px")[0]) <
            Math.floor((gameOptions.range.end / 100) * window.innerWidth)
        ) {
          if (
            avatarContainerRef.current.style.transform.includes(
              `translateY(-${
                100 - (gameOptions.difficulty ? gameOptions.difficulty * 3 : 2)
              }%)`
            ) ||
            avatarContainerRef.current.style.transform.includes(
              `translateY(-${
                gameOptions.difficulty ? gameOptions.difficulty * 3 : 2
              }%)`
            )
          ) {
            initializing.current = true;
            if ($scrollContainer) $scrollContainer.style.overflowY = "hidden";
            alert("걸렸죠?");
            if (startLeft) {
              $scrollContainer?.scroll({ top: 0, behavior: "smooth" });
            } else {
              $scrollContainer?.scroll({
                top: $scrollContainer.scrollHeight,
                behavior: "smooth",
              });
            }
          }
        }
      }

      registAvatarWidth(avatarContainerRef.current.clientWidth);
    }
  }, [avatarContainerRef.current, flyingEffect, gamePlayable]);

  return (
    <div
      ref={avatarContainerRef}
      style={{
        left: `${locationX}px`,
        transform: `${movingRight ? "scaleX(-1)" : ""}` + flyingEffect,
        height,
        width: "auto",
        borderRadius: "100%",
        position: "absolute",
        bottom: "0px",
      }}
    >
      {avatarImage ? (
        <img
          style={{ height: "100%" }}
          src={flyingEffect ? avatarImage.Flying : avatarImage.Standing}
        />
      ) : (
        <div
          style={{
            height: "100%",
            aspectRatio: "1",
            borderRadius: "100%",
            background: "black",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
