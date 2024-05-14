import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="h-full max-w-full">{children}</div>;
}
