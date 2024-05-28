"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";

import { ModalProvider } from "./modal-provider";
import { QueryProvider } from "./query-provider";
import { StoreProvider } from "./store-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <StoreProvider>
            <ModalProvider />
            {children}
            <Toaster />
          </StoreProvider>
        </QueryProvider>
      </ThemeProvider>
    </>
  );
};
