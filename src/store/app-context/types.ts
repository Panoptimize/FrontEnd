import { User, UserCredential } from "firebase/auth";
import React from "react";

export type UserObject = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type AppState = {
  user: User | null;
  email: String | null | undefined;
  setUser: (user: User) => void;
  accountType: string;
  setAccountType: (accountType: string) => void;
  tokens: Tokens | undefined;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loadingContext: boolean;
};

export type AppContextProps = {
  children: React.ReactNode;
};
