import React, { CSSProperties, useEffect, useRef } from "react";
import useScroller from "./hooks/useScroller";

import type { AvatarImage, GameOptions } from "./Context";

interface ContainerProps {
  children: React.ReactNode;
  style?: CSSProperties;
  avatarImage?: AvatarImage;
  gameOptions?: GameOptions;
}

const defaultStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "scroll",
};

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  avatarImage,
  gameOptions,
}) => {
  const scroller = useScroller();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scroller.registScrollContainer(scrollContainerRef.current);
    }
    if (avatarImage) {
      scroller.registAvatarImage(avatarImage);
    }
    if (gameOptions) {
      scroller.registGameOptions(gameOptions);
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        ...defaultStyle,
        ...style,
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Container;
