"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompanySidebarOption } from "@prisma/client";

import { icons } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavigationLinksProps = {
  items: CompanySidebarOption[];
};

export function NavigationLinks({ items }: NavigationLinksProps) {
  const pathname = usePathname();
  const activePath = pathname.split("/")[2];
  return (
    <>
      {items.map((item) => {
        let val;

        const result = icons.find((icon) => icon.value === item.icon);
        if (result) {
          val = <result.path />;
        }

        return (
          <div
            key={item.id}
            className={cn([
              "rounded-lg hover:bg-primary-foreground",
              (item.name.toLowerCase() === activePath ||
                activePath ===
                  item.name
                    .toLowerCase()
                    .replace("sub accounts", "all-subaccounts")) &&
                "rounded-lg bg-muted",
            ])}
          >
            <Link
              href={item.link}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              {val}
              <span className="text-base">{item.name}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
}
