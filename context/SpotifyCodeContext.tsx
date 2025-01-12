"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Context,
  FC,
  JSX,
} from "react";

interface SpotifyCodeContextType {
  code: string;
  setCode: (value: string) => void;
}

const SpotifyCodeContext: Context<SpotifyCodeContextType | undefined> =
  createContext<SpotifyCodeContextType | undefined>(undefined);

export const SpotifyCodeProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [code, setCode] = useState<string>("");

  return (
    <SpotifyCodeContext.Provider value={{ code, setCode }}>
      {children}
    </SpotifyCodeContext.Provider>
  );
};

export function useSpotifyCode(): SpotifyCodeContextType {
  const context: SpotifyCodeContextType | undefined =
    useContext(SpotifyCodeContext);

  if (!context) {
    throw new Error("useSpotifyCode must be used within a SpotifyCodeProvider");
  }

  return context;
}