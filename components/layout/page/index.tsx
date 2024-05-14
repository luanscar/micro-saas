import { cn } from "@/lib/utils";

export type PageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function PageRoot({ className, children }: PageGenericProps) {
  return (
    <section className={cn(["flex h-full flex-col", className])}>
      {children}
    </section>
  );
}

export function PageHeader({ className, children }: PageGenericProps) {
  return (
    <header
      className={cn([
        "flex items-center justify-between border-b border-border p-5 px-6",
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function PageHeaderTitle({ className, children }: PageGenericProps) {
  return (
    <span
      className={cn(["text-xs uppercase text-muted-foreground", className])}
    >
      {children}
    </span>
  );
}

export function PageMain({ className, children }: PageGenericProps) {
  return (
    <main className={cn(["flex flex-1 grow ", className])}>{children}</main>
  );
}
export function PageMainContainer({ className, children }: PageGenericProps) {
  return (
    <main
      className={cn(["container mx-auto max-w-screen-lg grow p-14", className])}
    >
      {children}
    </main>
  );
}

export const Page = {
  Root: PageRoot,
  Header: PageHeader,
  Title: PageHeaderTitle,
  Main: PageMain,
  MainContainer: PageMainContainer,
};
