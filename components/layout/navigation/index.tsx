import Link from "next/link";

import { cn } from "@/lib/utils";

type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={cn([
        "flex flex-col space-y-6 border-r border-border bg-secondary/5",
        className,
      ])}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header
      className={cn([
        "flex h-12 items-center border-b border-border px-6",
        className,
      ])}
    >
      {children}
    </header>
  );
}

function SidebarHeaderTitle({ className, children }: SidebarGenericProps) {
  return <h2 className={cn(["", className])}>{children}</h2>;
}

function SidebarMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(["px-3", className])}>{children}</main>;
}

function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

function SidebarNavHeaderTitle({ className, children }: SidebarGenericProps) {
  return (
    <div
      className={cn([
        "ml-3 text-[0.6rem] uppercase text-muted-foreground",
        className,
      ])}
    >
      {children}
    </div>
  );
}

function SidebarNavMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(["flex flex-col", className])}>{children}</main>;
}

type SidebarNavLinkProps = {
  href: string;
  active?: boolean;
};

function SidebarNavLink({
  className,
  children,
  href,
  active,
}: SidebarGenericProps<SidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        "flex items-center rounded-md px-3 py-2 text-xs",
        active && "bg-secondary",
        className,
      ])}
    >
      {children}
    </Link>
  );
}

function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn(["mt-auto border-t border-border p-6", className])}>
      {children}
    </footer>
  );
}

export const Navigation = {
  Root: Sidebar,
  SidebarMain: SidebarMain,
  NavMain: SidebarNavMain,
  Nav: SidebarNav,
  Header: SidebarHeader,
  NavHeader: SidebarNavHeader,
  Title: SidebarNavHeaderTitle,
  Footer: SidebarFooter,
  HeaderTitle: SidebarHeaderTitle,
  Link: SidebarNavLink,
};
