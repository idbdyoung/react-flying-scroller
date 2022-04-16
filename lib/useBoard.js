import { useEffect, useRef, useState } from "react";
import useWindowWidth from "./useWindowWidth";

const useBoardWidth = () => {
  const windowWidth = useWindowWidth();
  const boardRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(2);

  useEffect(() => {
    if (!boardRef.current) return;
    setWidth(boardRef.current.clientWidth);
    setHeight(boardRef.current.clientHeight);
  }, [windowWidth]);

  return { boardRef, width, height };
};

export default useBoardWidth;
