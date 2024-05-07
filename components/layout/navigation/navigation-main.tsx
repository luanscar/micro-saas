import React, { PropsWithChildren } from "react";

export function NavigationMain({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-grow flex-col space-y-2 p-4">{children}</main>
  );
}
