import { createContext } from "react";

const Context = createContext({
  $scrollContainer: null,
  avatarImage: {
    walking: null,
    flying: null,
  },
  avatarWidth: 0,
  directPoints: {},
  registScrollContainer: () => {},
  registAvatarImage: () => {},
  registAvatarSize: () => {},
  registDirectPoint: () => {},
});

export default Context;
