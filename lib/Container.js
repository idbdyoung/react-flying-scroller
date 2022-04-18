import React, { useEffect, useRef } from "react";

import useScroller from "./hooks/useScroller";

const getContainerStyle = () => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "scroll",
});

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
    <div ref={scrollContainerRef} style={{ ...getContainerStyle(), ...style }}>
      {children}
    </div>
  );
};

export default Container;
