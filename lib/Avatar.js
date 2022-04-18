import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useScroller from "./hooks/useScroller";

const Container = styled.div.attrs(
  ({ avatarState: { locationX, flyingEffect, movingRight } }) => ({
    style: {
      left: `${locationX}px`,
      transform: `${movingRight ? "scaleX(-1)" : ""}` + flyingEffect,
    },
  })
)`
  width: auto;
  height: ${({ height }) => `${height}px`};
  border-radius: 100%;
  position: absolute;
  bottom: 0;
`;

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
    <Container
      ref={avatarContainerRef}
      avatarState={avatarState}
      height={height}
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
    </Container>
  );
};

export default Avatar;
