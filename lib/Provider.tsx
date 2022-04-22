import React, { useCallback, useRef, useState } from "react";

import ScrollerContext from "./Context";
import type { AvatarImage, DirectPoints } from "./Context";

const useProvideScroller = () => {
  const [$scrollContainer, setScrollContainer] = useState<HTMLDivElement>();
  const [avatarWidth, setAvatarWidth] = useState<number>(0);
  const [avatarImage, setAvatarImage] = useState<AvatarImage>();
  const lastContentTop = useRef<number>(0);
  const isFirstContent = useRef<boolean>(true);
  const [directPoints, setDirectPoints] = useState<DirectPoints>({});

  const registScrollContainer = useCallback(
    ($el: HTMLDivElement) => setScrollContainer($el),
    []
  );

  const registAvatarImage = useCallback(
    (avatarImage: AvatarImage) => setAvatarImage(avatarImage),
    []
  );

  const registAvatarWidth = useCallback(
    (size: number) => setAvatarWidth(size),
    []
  );

  const registDirectPoint = useCallback((name: string, height: number) => {
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
  }, []);

  return {
    $scrollContainer,
    avatarImage,
    avatarWidth,
    directPoints,
    registScrollContainer,
    registAvatarImage,
    registAvatarWidth,
    registDirectPoint,
  };
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const scroller = useProvideScroller();

  return (
    <ScrollerContext.Provider value={scroller}>
      {children}
    </ScrollerContext.Provider>
  );
};

export default Provider;
