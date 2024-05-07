import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

function SidebarRoot({ className, children }: SidebarGenericProps) {
  return (
    <aside className={cn(["flex flex-col border-r border-border", className])}>
      {children}
    </aside>
  );
}

function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header
      className={cn([
        "flex items-center border-b border-border p-4",
        className,
      ])}
    >
      {children}
    </header>
  );
}

function SidebarHeaderTitle({ className, children }: SidebarGenericProps) {
  return <h2 className={cn(["font-heading ", className])}>{children}</h2>;
}

function SidebarBrand({ className, children }: SidebarGenericProps) {
  return (
    <Link href={siteConfig.url} className={cn(["", className])}>
      {children}
    </Link>
  );
}

type SidebarBrandLogoProps = {
  className?: string;
  src: string;
  alt: string;
};
function SidebarBrandLogo({ className, src, alt }: SidebarBrandLogoProps) {
  return (
    <Image
      width={30}
      height={30}
      src={src}
      alt={alt}
      className={cn(["", className])}
    />
  );
}

function SidebarBrandName({ className, children }: SidebarGenericProps) {
  return <h2 className={cn(["font-semibold", className])}>{children}</h2>;
}

function SidebarMain({ className, children }: SidebarGenericProps) {
  return (
    <main className={cn(["flex grow flex-col px-3", className])}>
      {children}
    </main>
  );
}

function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(["flex flex-col", className])}>{children}</nav>;
}

function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

function SidebarNavItem({ className, children }: SidebarGenericProps) {
  return <div className={cn(["space-y-2", className])}>{children}</div>;
}

function SidebarNavSection({ className, children }: SidebarGenericProps) {
  return (
    <div
      className={cn([
        "text-xs font-semibold uppercase text-muted-foreground",
        className,
      ])}
    >
      {children}
    </div>
  );
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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-primary",
        active && "bg-primary-foreground",
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

export const Sidebar = {
  Root: SidebarRoot,
  Main: SidebarMain,
  Nav: SidebarNav,
  NavHeader: SidebarNavHeader,
  NavSection: SidebarNavSection,
  NavItem: SidebarNavItem,
  NavLink: SidebarNavLink,
  Header: SidebarHeader,
  Title: SidebarHeaderTitle,
  Footer: SidebarFooter,
  Brand: SidebarBrand,
  BrandLogo: SidebarBrandLogo,
  BrandName: SidebarBrandName,
};
