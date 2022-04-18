import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useScroller from "./hooks/useScroller";

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rebeccapurple;
  overflow-y: scroll;
`;

const Container = ({
  children,
  style,
  avatar = { walking: null, flying: null },
}) => {
  const scroller = useScroller();
  const scrollContainerRef = useRef();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scroller.registScrollContainer(scrollContainerRef.current);
      scroller.registAvatarImage(avatar);
    }
  }, []);

  return (
    <ScrollContainer ref={scrollContainerRef} style={style}>
      {children}
    </ScrollContainer>
  );
};

export default Container;
