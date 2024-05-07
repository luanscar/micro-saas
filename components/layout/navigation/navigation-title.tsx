import { ReactNode } from "react";

type NavigationTitleProps = {
  children: ReactNode;
};
export function NavigationTitle({ children }: NavigationTitleProps) {
  return (
    <div className="">
      <span className="text-2xl font-bold">{children}</span>
    </div>
  );
}
