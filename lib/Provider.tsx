import React, { useCallback, useRef, useState } from "react";

import ScrollerContext, { GameOptions } from "./Context";
import type { AvatarImage, DirectPoints } from "./Context";

const useProvideScroller = () => {
  const lastContentTop = useRef<number>(0);
  const isFirstContent = useRef<boolean>(true);
  const [$scrollContainer, setScrollContainer] = useState<HTMLDivElement>();
  const [avatarWidth, setAvatarWidth] = useState<number>(0);
  const [avatarImage, setAvatarImage] = useState<AvatarImage>();
  const [directPoints, setDirectPoints] = useState<DirectPoints>({});
  const [gameOptions, setGameOptions] = useState<GameOptions>();
  const [gamePlayable, setGamePlayable] = useState<boolean>(false);
  const [startLeft, setStartLeft] = useState<boolean>(true);

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
    let currentHeight = 0;
    if (directPoints.hasOwnProperty(name)) return;

    if (isFirstContent.current) {
      isFirstContent.current = false;
      return setDirectPoints({ [name]: 0 });
    }
    lastContentTop.current += height;
    currentHeight = lastContentTop.current;

    setDirectPoints((prevState) => ({
      ...prevState,
      [name]: currentHeight,
    }));
  }, []);

  const registGameOptions = useCallback((option: GameOptions) => {
    setGamePlayable(true);
    setGameOptions(option);
  }, []);

  return {
    $scrollContainer,
    avatarImage,
    avatarWidth,
    directPoints,
    gameOptions,
    gamePlayable,
    startLeft,
    registScrollContainer,
    registAvatarImage,
    registAvatarWidth,
    registDirectPoint,
    registGameOptions,
    setGamePlayable,
    setStartLeft,
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
