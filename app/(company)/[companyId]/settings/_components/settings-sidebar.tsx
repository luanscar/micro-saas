"use client";

import React from "react";
import { usePathname } from "next/navigation";

type SettingsSidebarProps = {
  companyId: string;
};

export default function SettingsSidebar({ companyId }: SettingsSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <SidebarOld.Root>
      <SidebarOld.Main className="mt-10">
        <SidebarOld.Nav>
          <SidebarOld.NavItem>
            <SidebarOld.NavLink
              active={isActive(`/${companyId}/settings`)}
              href={`/${companyId}/settings`}
            >
              <span>Your profile</span>
            </SidebarOld.NavLink>
            <SidebarOld.NavLink
              active={isActive(`/${companyId}/settings/company`)}
              href={`/${companyId}/settings/company`}
            >
              <span>Company</span>
            </SidebarOld.NavLink>
            <SidebarOld.NavLink
              active={isActive(`/${companyId}/settings/team`)}
              href={`/${companyId}/settings/team`}
            >
              <span>Team</span>
            </SidebarOld.NavLink>
          </SidebarOld.NavItem>
        </SidebarOld.Nav>
      </SidebarOld.Main>
    </SidebarOld.Root>
  );
}
