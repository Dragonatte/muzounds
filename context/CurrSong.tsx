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
  songId: number;
  setSongId: (value: number) => void;
}

const CurrSongContext: Context<CurrSongContextType | undefined> = createContext<
  CurrSongContextType | undefined
>(undefined);

export const CurrSongProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [songId, setSongId] = useState<number>(0);

  return (
    <CurrSongContext.Provider value={{ songId, setSongId }}>
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
