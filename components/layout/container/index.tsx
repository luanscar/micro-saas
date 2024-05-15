import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="grid h-full max-w-full">{children}</div>;
}
