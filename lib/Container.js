import React, { useEffect, useRef } from "react";

import useScroller from "./hooks/useScroller";
import getStyle from "./getStyle";

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
    <div
      ref={scrollContainerRef}
      style={{ ...getStyle("container"), ...style }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Container;
