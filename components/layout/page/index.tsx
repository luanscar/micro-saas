import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type PageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function PageRoot({ className, children }: PageGenericProps) {
  return <div className={cn(["h-[calc(100vh-56.8px)]", className])}>{children}</div>;
}

export function PageHeader({ className, children }: PageGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

export function PageHeaderTitle({ className, children }: PageGenericProps) {
  return <span className={cn(["", className])}>{children}</span>;
}

export function PageContainer({ className, children }: PageGenericProps) {
  return (
    <ScrollArea
      className={cn([
        "h-[calc(100vh-56.8px)] w-full  rounded-md ",
        className,
      ])}
    >
      {children}
    </ScrollArea>
  );
}


export function PageContent({ className, children }: PageGenericProps) {
  return <div className={cn(["container flex justify-center  h-[calc(100vh-56.8px)]", className])}>{children}</div>;
}

export const Page = {
  Root: PageRoot,
  Header: PageHeader,
  Title: PageHeaderTitle,
  Container: PageContainer,
  Content: PageContent,
};
