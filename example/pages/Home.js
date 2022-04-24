import React from "react";
import styled from "styled-components";

import {
  Container as FlyScrollerContainer,
  Wrapper,
  Board,
  useDirectScroll,
  useGame,
} from "../../lib";

import ResetButton from "../components/ResetButton";
import Content from "../components/Content";
import ScrollButotn from "../components/ScrollButton";
import Standing from "../images/Avatar.png";
import Flying from "../images/FlyingAvatar.png";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const NavigationContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const contents = [
  { name: "first", color: "#4f85ed" },
  { name: "second", color: "#57A85C" },
  { name: "third", color: "#F2C043" },
  { name: "fourth", color: "#DA4E3D" },
];

const gameOptions = {
  range: {
    start: 5,
    end: 95,
  },
  difficulty: 1,
};

const Home = () => {
  const { gamePlayable, playAgain } = useGame();

  return (
    <Container>
      <Board style={{ height: "50px" }} gameBoarderColor={"#DA4E3D"} />
      {!gamePlayable && (
        <>
          <NavigationContainer>
            {contents.map(({ name, color, flex }) => (
              <ScrollButotn
                key={name}
                flex={flex}
                onClick={useDirectScroll(name)}
                name={name}
                color={color}
              />
            ))}
          </NavigationContainer>
          <ResetButton onClick={playAgain} />
        </>
      )}
      <FlyScrollerContainer
        style={{ flex: 1 }}
        avatarImage={{ Standing, Flying }}
        gameOptions={gameOptions}
      >
        {contents.map(({ name, color }) => (
          <Wrapper key={name} name={name}>
            <Content color={color}>first</Content>
          </Wrapper>
        ))}
      </FlyScrollerContainer>
    </Container>
  );
};

export default Home;
