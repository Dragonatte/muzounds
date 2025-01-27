"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// @ts-ignore
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

import { SearchProvider } from "@/context/SearchContext";
import { CurrSongProvider } from "@/context/CurrSong";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <CurrSongProvider>
        <SearchProvider>
          <HeroUIProvider locale="es-ES" navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </HeroUIProvider>
        </SearchProvider>
      </CurrSongProvider>
    </SessionProvider>
  );
}
