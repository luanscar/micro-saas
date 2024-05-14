"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";

import { ModalProvider } from "./modal-provider";
import { UserStoreProvider } from "./user-store-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserStoreProvider>
          <ModalProvider />
          {children}
          <Toaster />
        </UserStoreProvider>
      </ThemeProvider>
    </>
  );
};
