import React, { ReactNode } from "react";
import Link from "next/link";

type NavigationLink = {
  children: ReactNode;
  href: string;
};

export function NavigationLink({ children, href }: NavigationLink) {
  return (
    <div>
      <Link href={href}>{children}</Link>
    </div>
  );
}
