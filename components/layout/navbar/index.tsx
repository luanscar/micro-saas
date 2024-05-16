import { ButtonHTMLAttributes, ElementType, ReactEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type NavbarGenericProps<T = unknown> = {
  children?: React.ReactNode;
  className?: string;
  isResponsive?: boolean;
} & T;

function NavbarRoot({ children, className }: NavbarGenericProps) {
  return <div className={cn(["", className])}>{children}</div>;
}
function Nav({ className, children }: NavbarGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

function NavbarHeader({ className, children }: NavbarGenericProps) {
  return <header className={cn(["w-full ", className])}>{children}</header>;
}
function NavbarTitle({ className, children }: NavbarGenericProps) {
  return <h2 className={cn(["", className])}>{children}</h2>;
}
function NavbarBrand({ className, children }: NavbarGenericProps) {
  return (
    <div
      className={cn([
        "flex w-full items-center justify-start gap-4",
        className,
      ])}
    >
      {children}
    </div>
  );
}

type NavBrandLogoProps = {
  className?: string;
  src: string;
  alt: string;
};
function NavbarBrandLogo({ className, src, alt }: NavBrandLogoProps) {
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

function NavbarBrandName({ className, children }: NavbarGenericProps) {
  return <main className={cn(["", className])}>{children}</main>;
}

interface NavbarLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  active?: boolean;
  onClick?: () => void;
}
function NavbarLink({
  className,
  children,
  active,
  href,
  onClick,
}: NavbarGenericProps<NavbarLinkProps>) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn([
        "text-muted-foreground transition-all  hover:bg-primary-foreground hover:text-primary flex items-center gap-4 rounded-md px-4 py-2",
        className,
        active && "bg-primary-foreground",
      ])}
    >
      {children}
    </Link>
  );
}

function NavbarLabel({ className, children }: NavbarGenericProps) {
  return <span className={cn(["", className])}>{children}</span>;
}

type NavbarIconProps = {
  className?: string;
  icon: ElementType;
};
function NavbarIcon({ className, icon: Icon }: NavbarIconProps) {
  return <Icon className={cn(["h-6 w-6", className])} />;
}

function NavbarItem({ className, children }: NavbarGenericProps) {
  return <div className={cn(["w-full", className])}>{children}</div>;
}
function NavbarFooter({ className, children }: NavbarGenericProps) {
  return <footer className={cn(["w-full", className])}>{children}</footer>;
}

export const Navbar = {
  Root: NavbarRoot,
  Nav: Nav,
  Header: NavbarHeader,
  Title: NavbarTitle,
  Brand: NavbarBrand,
  BrandName: NavbarBrandName,
  BrandLogo: NavbarBrandLogo,
  Item: NavbarItem,
  Icon: NavbarIcon,
  Link: NavbarLink,
  Label: NavbarLabel,
  Footer: NavbarFooter,
};
