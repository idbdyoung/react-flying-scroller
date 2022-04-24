import { useEffect, useRef, useState } from "react";

import useScroller from "./useScroller";
import useWindowWidth from "./useWindowWidth";

const useBoard = () => {
  const { avatarWidth } = useScroller();
  const windowWidth = useWindowWidth();
  const boardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!boardRef.current) return;
    setWidth(boardRef.current.clientWidth - (avatarWidth ? avatarWidth : 30));
    setHeight(boardRef.current.clientHeight);
  }, [windowWidth, avatarWidth]);

  return { boardRef, width, height };
};

export default useBoard;
