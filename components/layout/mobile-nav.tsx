"use client";

import * as React from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { Home, Settings2 } from "lucide-react";

import { icons } from "@/lib/constants";

import { UserDrawer } from "../user-drawer";
import { Navbar } from "./navbar";

export function MobileNav() {
  const company = useUserStore().getState().data?.company;

  return (
    <Navbar.Root className="fixed bottom-0 w-full border-t p-2">
      <Navbar.Nav className="flex ">
        {company?.sidebarOptions.map((s) => {
          let val;
          const result = icons.find((i) => i.value === s.icon);
          if (result) {
            val = <result.path className="h-8 w-8" />;
          }
          return (
            <Navbar.Item key={s.id}>
              <Navbar.Link
                href={`/${company?.id}/${s.name.toLocaleLowerCase()}`}
              >
                {val}
              </Navbar.Link>
            </Navbar.Item>
          );
        })}
        <Navbar.Item>
          <UserDrawer />
        </Navbar.Item>
      </Navbar.Nav>
    </Navbar.Root>
  );
}
