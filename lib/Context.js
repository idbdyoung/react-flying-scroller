import { createContext } from "react";

const Context = createContext({
  $scrollBox: null,
  registScrollBox: () => {},
});

export default Context;
