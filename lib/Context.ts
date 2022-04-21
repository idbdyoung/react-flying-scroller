import { createContext } from "react";

export type AvatarImage = {
  walking: JSX.Element;
  flying: JSX.Element;
};

type DirectPoints = {
  [key: string]: number;
};

type Context = {
  $scrollContainer?: HTMLDivElement;
  avatarImage?: AvatarImage;
  avatarWidth: number;
  directPoints: DirectPoints;
  registScrollContainer: (...any: any) => void;
  registAvatarImage: (...any: any) => void;
  registAvatarSize: (...any: any) => void;
  registDirectPoint: (...any: any) => void;
};

const initial = {
  $scrollContainer: undefined,
  avatarImage: undefined,
  avatarWidth: 0,
  directPoints: {},
  registScrollContainer: () => {},
  registAvatarImage: () => {},
  registAvatarSize: () => {},
  registDirectPoint: () => {},
};

const Default = createContext<Context>(initial);

export default Default;
