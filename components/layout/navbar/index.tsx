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
  return (
    <div className={cn(["delay-900 animate-fade-up", className])}>
      {children}
    </div>
  );
}
function Nav({ className, children }: NavbarGenericProps) {
  return <nav className={cn(["h-full", className])}>{children}</nav>;
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
    <button className="w-full">
      <Link
        onClick={onClick}
        href={href}
        className={cn([
          "flex  items-center justify-center rounded-full font-medium text-muted-foreground transition-all  hover:text-primary  md:h-full md:w-full md:justify-normal md:gap-4 md:rounded-md md:px-3 md:py-2",
          className,
        ])}
      >
        {children}
      </Link>
    </button>
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
  return (
    <div className={cn(["flex w-full items-center justify-center", className])}>
      {children}
    </div>
  );
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
};
