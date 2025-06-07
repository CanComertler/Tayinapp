import { createContext } from "react";

export type AppUser = {
  Unvan?: string;
  [key: string]: any;
};

export const UserContext = createContext<AppUser | null>(null);
