import React, { useCallback, useState } from "react";

import ScrollerContext from "./Context";

const useProvideScroller = () => {
  const [$scrollContainer, setScrollContainer] = useState(null);
  const [avatarWidth, setAvatarWidth] = useState(0);
  const [avatarImage, setAvatarImage] = useState({
    walking: null,
    flying: null,
  });

  const registScrollContainer = useCallback(
    ($el) => setScrollContainer($el),
    []
  );

  const registAvatarImage = (imageSet) => setAvatarImage(imageSet);

  const registAvatarSize = (size) => setAvatarWidth(size);

  return {
    $scrollContainer,
    avatarImage,
    avatarWidth,
    registScrollContainer,
    registAvatarImage,
    registAvatarSize,
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
