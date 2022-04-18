import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs(
  ({ avatarState: { locationX, flyingEffect, isMovingRight } }) => ({
    style: {
      left: `${locationX}px`,
      transform: `${isMovingRight ? "scaleX(-1)" : ""}` + flyingEffect,
    },
  })
)`
  width: 30px;
  height: ${({ height }) => `${height}px`};
  border-radius: 100%;
  background: magenta;
  position: absolute;
  bottom: 0;
`;

const Avatar = ({ avatarState, height }) => {
  return (
    <Container avatarState={avatarState} height={height}>
      example
    </Container>
  );
};

export const getDefaultAvatar = (avatarState) => (
  <img src={avatarState === "flying" ? "" : ""} />
);

export default Avatar;
