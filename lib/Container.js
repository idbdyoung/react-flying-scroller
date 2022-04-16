import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useScroller } from "./Provider";

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rebeccapurple;
  overflow-y: scroll;
`;

const Container = ({ children, style }) => {
  const scroller = useScroller();
  const scrollBoxRef = useRef();

  useEffect(() => {
    if (scrollBoxRef.current) {
      scroller.registScrollBox(scrollBoxRef.current);
    }
  }, []);

  return (
    <ScrollContainer ref={scrollBoxRef} style={style}>
      {children}
    </ScrollContainer>
  );
};

export default Container;
