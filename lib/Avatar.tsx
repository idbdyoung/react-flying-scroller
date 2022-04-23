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
  const { avatarImage, registAvatarWidth } = useScroller();

  useEffect(() => {
    if (avatarContainerRef.current) {
      registAvatarWidth(avatarContainerRef.current.clientWidth);
    }
  }, [avatarContainerRef.current, flyingEffect]);

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
