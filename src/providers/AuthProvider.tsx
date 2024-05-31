import { createContext, PropsWithChildren } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
