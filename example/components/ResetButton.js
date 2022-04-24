import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid white;
  background: #333333;
  cursor: pointer;
`;

const ResetButton = ({ onClick }) => {
  return <Container onClick={onClick}>reGame</Container>;
};

export default ResetButton;
