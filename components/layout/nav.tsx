"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompanySidebarOption } from "@prisma/client";

import { SidebarNavItem } from "types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

interface DashboardNavProps {
  items: CompanySidebarOption[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.link && (
            <Link key={item.id} href={item.link}>
              <span>
                <span>{item.name}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
