import { createContext } from "react";

export interface context {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
  token: "",
  setToken: () => {},
};

export const tokenContext = createContext<context>(defaultValue);
