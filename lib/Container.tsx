import React, { useEffect, useRef } from "react";
import useScroller from "./hooks/useScroller";
import getDefaultStyle from "./getDefaultStyle";

import type { DivStyleProp } from "./getDefaultStyle";
import type { AvatarImage } from "./Context";

interface ContainerProps extends DivStyleProp {
  avatarImage: AvatarImage;
  children: React.ReactNode;
}

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
      scroller.registAvatarImage(avatarImage);
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ ...getDefaultStyle("container"), ...style }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Container;
