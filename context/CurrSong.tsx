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

interface CurrSongContextType {
  songUris: string[];
  setSongUris: (value: string[]) => void;
}

const CurrSongContext: Context<CurrSongContextType | undefined> = createContext<
  CurrSongContextType | undefined
>(undefined);

export const CurrSongProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [songUris, setSongUris] = useState<string[]>([]);

  return (
    <CurrSongContext.Provider value={{ songUris, setSongUris }}>
      {children}
    </CurrSongContext.Provider>
  );
};

export function useCurrSong(): CurrSongContextType
{
  const context: CurrSongContextType | undefined = useContext(CurrSongContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
