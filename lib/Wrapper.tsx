import React, { useEffect, useRef } from "react";

import useScroller from "./hooks/useScroller";

interface WrapperProps {
  children: React.ReactNode;
  name: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, name }) => {
  const { registDirectPoint } = useScroller();
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) return;
    registDirectPoint(name, wrapper.current.clientHeight);
  }, []);

  return <div ref={wrapper}>{children}</div>;
};

export default Wrapper;
