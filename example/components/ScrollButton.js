import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => flex};
  color: ${({ color }) => color};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px 0;
`;

const ScrollButton = ({ flex, name, color, onClick }) => {
  return (
    <Container onClick={onClick} color={color} flex={flex}>
      {name}
    </Container>
  );
};

export default ScrollButton;
