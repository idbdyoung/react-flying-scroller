import React from "react";
import styled from "styled-components";

import Avatar from "../images/Avatar.png";
import FlyingAvatar from "../images/FlyingAvatar.png";

import { Container as FlyScrollerContainer, Wrapper, Board } from "../../lib";

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const First = styled.div`
  width: 100%;
  height: 1500px;
  background: yellow;
`;
const Second = styled.div`
  width: 100%;
  height: 1500px;
  background: green;
`;

const avatar = {
  walking: Avatar,
  flying: FlyingAvatar,
};

const Home = () => {
  return (
    <Cont>
      <Board />
      <FlyScrollerContainer style={{ flex: 1 }}>
        <Wrapper>
          <First>first</First>
        </Wrapper>
        <Wrapper>
          <Second>second</Second>
        </Wrapper>
      </FlyScrollerContainer>
    </Cont>
  );
};

export default Home;
