"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { UserWithCompanyWithPermissions } from "@/types";
import { User } from "lucide-react";

import { icons } from "@/lib/constants";
import { Sidebar } from "@/components/layout/sidebar";

type NavigationSidebarProps = {
  data: UserWithCompanyWithPermissions;
};

export default function NavigationSidebar({ data }: NavigationSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path.split("/")[2]);

  return (
    <Sidebar.Root>
      <Sidebar.Header>
        <Sidebar.Brand className="flex items-center justify-center gap-2">
          <Sidebar.BrandLogo
            alt="Brand Logo"
            src={"https://img.logoipsum.com/245.svg"}
          />
          <Sidebar.BrandName>{data.company?.name}</Sidebar.BrandName>
        </Sidebar.Brand>
      </Sidebar.Header>
      <Sidebar.Main className="grow pt-4">
        <Sidebar.Nav className="space-y-2">
          {data.company?.sidebarOptions.map((sidebarOption) => {
            let val;

            const result = icons.find(
              (icon) => icon.value === sidebarOption.icon,
            );
            if (result) {
              val = <result.path size={20} />;
            }
            return (
              <Sidebar.NavItem key={sidebarOption.id}>
                <Sidebar.NavLink
                  active={isActive(sidebarOption.link)}
                  href={sidebarOption.link}
                >
                  {val}
                  {sidebarOption.name}
                </Sidebar.NavLink>
              </Sidebar.NavItem>
            );
          })}
        </Sidebar.Nav>
      </Sidebar.Main>
      <Sidebar.Footer className="flex items-center">
        <User />
        <span>Span</span>
      </Sidebar.Footer>
    </Sidebar.Root>
  );
}
