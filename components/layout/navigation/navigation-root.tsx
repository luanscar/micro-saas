type NavigationRootProps = {
  children: React.ReactNode;
};

export function NavigationRoot({ children }: NavigationRootProps) {
  return (
    <div className="flex  flex-col space-y-6 border-r border-border bg-secondary/5">
      {children}
    </div>
  );
}
