import React, { useEffect, useRef } from "react";

import useScroller from "./hooks/useScroller";

const Wrapper = ({ children, name }) => {
  const { registDirectPoint } = useScroller();
  const contentsWrapperRef = useRef();

  useEffect(() => {
    if (!contentsWrapperRef.current) return;
    registDirectPoint(name, contentsWrapperRef.current.clientHeight);
  }, [contentsWrapperRef.current]);

  return <div ref={contentsWrapperRef}>{children}</div>;
};

export default Wrapper;
