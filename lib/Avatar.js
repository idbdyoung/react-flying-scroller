import React, { useEffect, useRef } from "react";

import getStyle from "./getStyle";
import useScroller from "./hooks/useScroller";

const Avatar = ({ avatarState, height }) => {
  const avatarContainerRef = useRef();
  const { flyingEffect } = avatarState;
  const { avatarImage, registAvatarSize } = useScroller();

  useEffect(() => {
    if (avatarContainerRef.current) {
      registAvatarSize(avatarContainerRef.current.clientWidth);
    }
  }, [avatarContainerRef.current, flyingEffect]);

  return (
    <div
      ref={avatarContainerRef}
      style={getStyle("avatar")(avatarState, height)}
    >
      {avatarImage.flying && avatarImage.walking ? (
        <img
          style={{ height: "100%" }}
          src={flyingEffect ? avatarImage.flying : avatarImage.walking}
        />
      ) : (
        <div
          style={{
            height: "100%",
            aspectRatio: 1,
            borderRadius: "100%",
            background: "black",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
