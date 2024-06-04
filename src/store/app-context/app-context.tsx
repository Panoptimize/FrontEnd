import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AppContextProps, AppState, Tokens } from "./types";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import httpInstance from "../../services/httpInstance";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<String | null | undefined>(null);
  const [loadingContext, setLoadingContext] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>("");
  const [tokens, setTokens] = useState<Tokens | undefined>(undefined);

  const setTokensState = (accessToken: string, refreshToken: string) => {
    setTokens({ access_token: accessToken, refresh_token: refreshToken });
  };

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getEmail = () =>{
    return  email;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setEmail(currentUser?.providerData[0].email)
      setUser(currentUser);
      setLoadingContext(false);
      if (currentUser) {
        httpInstance.interceptors.request.use(
          async (config) => {
            onAuthStateChanged(auth, async (currentUser) => {
              if (currentUser) {
                const token = await getIdToken(currentUser);
                config.headers.Authorization = `Bearer ${token}`;
              }
            });
            console.log(config);

            return config;
          },
          (error) => {
            return Promise.reject(error);
          },
        );
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        email,
        setUser,
        accountType,
        setAccountType,
        tokens,
        setTokens: setTokensState,
        login: login,
        signUp: signUp,
        loadingContext: loadingContext,
        logOut: logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
