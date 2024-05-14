"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";

type SettingsSidebarProps = {
  companyId: string;
};

export default function SettingsSidebar({ companyId }: SettingsSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar.Root>
      <Sidebar.Main className="mt-10">
        <Sidebar.Nav>
          <Sidebar.NavItem>
            <Sidebar.NavLink
              active={isActive(`/${companyId}/settings`)}
              href={`/${companyId}/settings`}
            >
              <span>Your profile</span>
            </Sidebar.NavLink>
            <Sidebar.NavLink
              active={isActive(`/${companyId}/settings/company`)}
              href={`/${companyId}/settings/company`}
            >
              <span>Company</span>
            </Sidebar.NavLink>
            <Sidebar.NavLink
              active={isActive(`/${companyId}/settings/team`)}
              href={`/${companyId}/settings/team`}
            >
              <span>Team</span>
            </Sidebar.NavLink>
          </Sidebar.NavItem>
        </Sidebar.Nav>
      </Sidebar.Main>
    </Sidebar.Root>
  );
}
