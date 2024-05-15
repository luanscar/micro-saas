import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type PageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function PageRoot({ className, children }: PageGenericProps) {
  return <div className={cn(["max-h-screen", className])}>{children}</div>;
}

export function PageHeader({ className, children }: PageGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

export function PageHeaderTitle({ className, children }: PageGenericProps) {
  return <span className={cn(["", className])}>{children}</span>;
}

export function PageContent({ className, children }: PageGenericProps) {
  return <ScrollArea className={cn([" ", className])}>{children}</ScrollArea>;
}
export function PageContainer({ className, children }: PageGenericProps) {
  return (
    <ScrollArea
      className={cn([
        "h-[calc(100vh-100px)] rounded-md py-2 md:py-8",
        className,
      ])}
    >
      {children}
    </ScrollArea>
  );
}

export const Page = {
  Root: PageRoot,
  Header: PageHeader,
  Title: PageHeaderTitle,
  Container: PageContainer,
  Content: PageContent,
};
