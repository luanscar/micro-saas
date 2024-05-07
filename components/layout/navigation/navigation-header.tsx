import { ReactNode } from "react";
import { RocketIcon } from "lucide-react";

type NavigationHeaderProps = {
  children: ReactNode;
};
export function NavigationHeader({ children }: NavigationHeaderProps) {
  return <div className="flex items-center gap-4 border-b p-4">{children}</div>;
}
