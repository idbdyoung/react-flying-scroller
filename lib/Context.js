import { createContext } from "react";

const Context = createContext({
  $scrollContainer: null,
  avatarImage: {
    walking: null,
    flying: null,
  },
  registScrollContainer: () => {},
  registAvatarImage: () => {},
});

export default Context;
