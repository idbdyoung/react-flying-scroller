import React, { useCallback, useEffect, useRef } from "react";

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
    initializing,
    registAvatarWidth,
    setGamePlayable,
  } = useScroller();

  const moveAvatarToStart = useCallback(() => {
    if (!$scrollContainer) return;
    initializing.current = true;
    $scrollContainer.style.overflowY = "hidden";

    if (startLeft) {
      $scrollContainer?.scroll({ top: 0, behavior: "smooth" });
    } else {
      $scrollContainer?.scroll({
        top: $scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [$scrollContainer, startLeft]);

  useEffect(() => {
    if (!avatarContainerRef.current) return;
    if (!$scrollContainer) return;
    if (gameOptions && gamePlayable) {
      const currentAvatarPx = Number(
        avatarContainerRef.current.style.left.split("px")[0]
      );
      const currentAvatarLanding =
        !avatarContainerRef.current.style.transform.includes("translateY");
      const leftSideClearPx = Math.floor(
        Math.floor((gameOptions.range.start / 100) * window.innerWidth)
      );
      const rightSideClearPx = Math.floor(
        (gameOptions.range.end / 100) * window.innerWidth
      );

      //게임 클리어 조건
      if (startLeft) {
        if (!initializing.current && currentAvatarPx > rightSideClearPx) {
          setGamePlayable(false);
          alert("클리어 🚀🚀");
        }
      } else {
        if (!initializing.current && currentAvatarPx + 30 < leftSideClearPx) {
          setGamePlayable(false);
          alert("클리어 🚀🚀");
        }
      }

      //스크롤 가능하게 하여 게임 재개할 수 있는 조건
      if (startLeft) {
        if (currentAvatarPx <= leftSideClearPx && currentAvatarLanding) {
          initializing.current = false;
          if ($scrollContainer) $scrollContainer.style.overflowY = "scroll";
        }
      } else {
        if (currentAvatarPx >= rightSideClearPx && currentAvatarLanding) {
          initializing.current = false;
          if ($scrollContainer) $scrollContainer.style.overflowY = "scroll";
        }
      }

      // 게임 실패하는 조건
      //x축 확인
      if (
        !initializing.current &&
        currentAvatarPx > leftSideClearPx &&
        currentAvatarPx < rightSideClearPx
      ) {
        //y 축 확인
        const avatarHeight = Number(
          avatarContainerRef.current.style.transform
            ?.split("translateY(-")[1]
            ?.split("%")[0]
        );

        if (
          avatarHeight >
            100 - (gameOptions.difficulty ? gameOptions.difficulty * 3 : 2) ||
          avatarHeight <
            (gameOptions.difficulty ? gameOptions.difficulty * 3 : 2)
        ) {
          alert("걸렸죠?");
          moveAvatarToStart();
        }
      }
    }

    registAvatarWidth(avatarContainerRef.current.clientWidth);
  }, [avatarContainerRef.current, flyingEffect, gamePlayable, startLeft]);

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
