import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer;

    const handleResize = (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => setWidth(window.innerWidth), 100);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useWindowWidth;
