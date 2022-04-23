import { createContext } from "react";

export type AvatarImage = {
  Standing: any;
  Flying: any;
};

export type DirectPoints = {
  [key: string]: number;
};

type Context = {
  $scrollContainer?: HTMLDivElement;
  avatarImage?: AvatarImage;
  avatarWidth: number;
  directPoints: DirectPoints;
  registScrollContainer: ($el: HTMLDivElement) => void;
  registAvatarImage: (avatarImage: AvatarImage) => void;
  registAvatarWidth: (size: number) => void;
  registDirectPoint: (name: string, height: number) => void;
};

const initial = {
  $scrollContainer: undefined,
  avatarImage: undefined,
  avatarWidth: 0,
  directPoints: {},
  registScrollContainer: () => {},
  registAvatarImage: () => {},
  registAvatarWidth: () => {},
  registDirectPoint: () => {},
};

const Default = createContext<Context>(initial);

export default Default;
