import React, { useCallback, useRef, useState } from "react";

import ScrollerContext from "./Context";

const useProvideScroller = () => {
  const [$scrollContainer, setScrollContainer] = useState(null);
  const [avatarWidth, setAvatarWidth] = useState(0);
  const [avatarImage, setAvatarImage] = useState({
    walking: null,
    flying: null,
  });
  const lastContentTop = useRef(0);
  const isFirstContent = useRef(true);
  const [directPoints, setDirectPoints] = useState({});

  const registScrollContainer = useCallback(
    ($el) => setScrollContainer($el),
    []
  );

  const registAvatarImage = (imageSet) => setAvatarImage(imageSet);

  const registAvatarSize = (size) => setAvatarWidth(size);

  const registDirectPoint = (name, height) => {
    if (directPoints.hasOwnProperty(name)) return;

    if (isFirstContent.current) {
      isFirstContent.current = false;
      return setDirectPoints({ [name]: 0 });
    }
    lastContentTop.current += height;

    setDirectPoints((prevState) => ({
      ...prevState,
      [name]: lastContentTop.current,
    }));
  };

  return {
    $scrollContainer,
    avatarImage,
    avatarWidth,
    directPoints,
    registScrollContainer,
    registAvatarImage,
    registAvatarSize,
    registDirectPoint,
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

export default Provider;
