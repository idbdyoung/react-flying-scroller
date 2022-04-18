import { useEffect, useRef, useState } from "react";
import useScroller from "./useScroller";
import useWindowWidth from "./useWindowWidth";

const useBoardWidth = () => {
  const { avatarWidth } = useScroller();
  const windowWidth = useWindowWidth();
  const boardRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!boardRef.current) return;
    setWidth(boardRef.current.clientWidth - (avatarWidth ? avatarWidth : 30));
    setHeight(boardRef.current.clientHeight);
  }, [windowWidth, avatarWidth]);

  return { boardRef, width, height };
};

export default useBoardWidth;
