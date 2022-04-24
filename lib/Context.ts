import { createContext } from "react";

export type AvatarImage = {
  Standing: any;
  Flying: any;
};

export type DirectPoints = {
  [key: string]: number;
};

export type GameOptions = {
  range: {
    start: number;
    end: number;
  };
  difficulty?: number;
  countDown?: number;
};

type Context = {
  $scrollContainer?: HTMLDivElement;
  avatarImage?: AvatarImage;
  avatarWidth: number;
  directPoints: DirectPoints;
  gameOptions?: GameOptions;
  gamePlayable: boolean;
  startLeft: boolean;
  registScrollContainer: ($el: HTMLDivElement) => void;
  registAvatarImage: (avatarImage: AvatarImage) => void;
  registAvatarWidth: (size: number) => void;
  registDirectPoint: (name: string, height: number) => void;
  registGameOptions: (options: GameOptions) => void;
  setGamePlayable: React.Dispatch<React.SetStateAction<boolean>>;
  setStartLeft: React.Dispatch<React.SetStateAction<boolean>>;
};

const initial = {
  $scrollContainer: undefined,
  avatarImage: undefined,
  avatarWidth: 0,
  directPoints: {},
  gameOptions: undefined,
  gamePlayable: false,
  startLeft: true,
  registScrollContainer: () => {},
  registAvatarImage: () => {},
  registAvatarWidth: () => {},
  registDirectPoint: () => {},
  registGameOptions: () => {},
  setGamePlayable: () => {},
  setStartLeft: () => {},
};

const Default = createContext<Context>(initial);

export default Default;
