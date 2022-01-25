import { createContext } from "react";

/* export const userContext = createContext({
  user: {},
  setUser: (arg: any) => {},
});
 */

interface User {
  username: string;
  _id: string;
}

export interface context {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const defaultValue = {
  user: null,
  setUser: () => {},
};

export const userContext = createContext<context>(defaultValue);
