import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 1200px;
  background: ${({ color }) => color};
`;

const Content = ({ text, color }) => {
  return <Container color={color}>{text}</Container>;
};

export default Content;
