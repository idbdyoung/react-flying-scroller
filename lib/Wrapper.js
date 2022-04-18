import React, { useRef } from "react";

const Wrapper = ({ children }) => {
  const contentsWrapperRef = useRef();

  return <div ref={contentsWrapperRef}>{children}</div>;
};

export default Wrapper;
