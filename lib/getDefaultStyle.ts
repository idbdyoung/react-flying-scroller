import React, { HTMLAttributes } from "react";

export interface DivStyleProp extends HTMLAttributes<HTMLDivElement> {}

type ComponentType = "board" | "container" | "avatar";

const getDefaultStyle = (
  type: ComponentType
):
  | React.CSSProperties
  | ((avatarState: any, height: number) => React.CSSProperties) => {
  switch (type) {
    case "board": {
      return {
        position: "relative",
        width: "100%",
        height: "100px",
        background: "white",
        borderBottom: "1px solid gray",
      };
    }
    case "container": {
      return {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "scroll",
      };
    }
    case "avatar": {
      return ({ locationX, flyingEffect, movingRight }, height) => ({
        left: `${locationX}px`,
        transform: `${movingRight ? "scaleX(-1)" : ""}` + flyingEffect,
        height,
        width: "auto",
        borderRadius: "100%",
        position: "absolute",
        bottom: "0px",
      });
    }
  }
};

export default getDefaultStyle;
