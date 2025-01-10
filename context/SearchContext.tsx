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

interface SearchContextType {
  search: string;
  setSearch: (value: string) => void;
}

const SearchContext: Context<SearchContextType | undefined> = createContext<
  SearchContextType | undefined
>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch(): SearchContextType
{
  const context: SearchContextType | undefined = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
