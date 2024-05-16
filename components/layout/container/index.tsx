import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="grid h-screen max-w-full">{children}</div>;
}
