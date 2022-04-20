import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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

Wrapper.proptypes = {
  name: PropTypes.string,
};

export default Wrapper;
