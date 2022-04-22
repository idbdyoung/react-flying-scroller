import React from "react";
import styled from "styled-components";

import Avatar from "../images/Avatar.png";
import FlyingAvatar from "../images/FlyingAvatar.png";

import {
  Container as FlyScrollerContainer,
  Wrapper,
  Board,
  useDirectScroll,
} from "../../lib";

const Cont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const First = styled.div`
  display: flex;
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

const FirstButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: yellow;
`;

const SecondButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: yellow;
`;

const Home = () => {
  return (
    <Cont>
      <Board style={{ height: "50px" }} />
      <FlyScrollerContainer style={{ flex: 1 }}>
        <FirstButton onClick={useDirectScroll("first")}>첫번째</FirstButton>
        <SecondButton onClick={useDirectScroll("second")}>두번째</SecondButton>
        <Wrapper name="first">
          <First>first</First>
        </Wrapper>
        <Wrapper name="second">
          <Second>second</Second>
        </Wrapper>
      </FlyScrollerContainer>
    </Cont>
  );
};

export default Home;
