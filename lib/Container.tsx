import React, { CSSProperties, useEffect, useRef } from "react";
import useScroller from "./hooks/useScroller";

import type { AvatarImage } from "./Context";

interface ContainerProps {
  children: React.ReactNode;
  style?: CSSProperties;
  avatarImage?: AvatarImage;
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
}) => {
  const scroller = useScroller();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scroller.registScrollContainer(scrollContainerRef.current);
    }
  }, [scrollContainerRef.current]);

  useEffect(() => {
    if (avatarImage) {
      scroller.registAvatarImage(avatarImage);
    }
  }, [avatarImage]);

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
