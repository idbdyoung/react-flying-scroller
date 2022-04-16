import React, { useCallback, useContext, useState } from "react";

import ScrollerContext from "./Context";

const useProvideScroller = () => {
  const [$scrollBox, setScrollBox] = useState(null);

  const registScrollBox = useCallback(($el) => setScrollBox($el), []);

  return {
    $scrollBox,
    registScrollBox,
  };
};

const Provider = ({ children }) => {
  const scroller = useProvideScroller();

  return (
    <ScrollerContext.Provider value={scroller}>
      {children}
    </ScrollerContext.Provider>
  );
};

export const useScroller = () => useContext(ScrollerContext);

export default Provider;
