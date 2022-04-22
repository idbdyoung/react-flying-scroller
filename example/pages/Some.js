import React from "react";
import styled from "styled-components";

import { Container as FlyScrollerContainer, Wrapper, Board } from "../../lib";

const Container = styled.div`
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
const Third = styled.div`
  width: 100%;
  height: 1500px;
  background: magenta;
`;

const Some = () => {
  return (
    <Container>
      {/* <Board />
      <FlyScrollerContainer style={{ flex: 1 }}>
        <Wrapper>
          <First />
        </Wrapper>
        <Wrapper>
          <Second />
        </Wrapper>
        <Wrapper>
          <Third />
        </Wrapper>
      </FlyScrollerContainer> */}
    </Container>
  );
};

export default Some;
