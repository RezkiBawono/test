import { createContext, PropsWithChildren, useEffect } from "react";

type AuthData = {};

export const AuthContext = createContext<AuthData>({});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log("AuthProvider is mounted");
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
