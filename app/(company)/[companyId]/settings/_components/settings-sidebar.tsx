"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

type SettingsSidebarProps = {
  companyId: string;
};

export default function SettingsSidebar({ companyId }: SettingsSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Navbar.Root className="hidden h-full flex-col border-r border-border md:flex">
      <Navbar.Nav className="grow space-y-2 p-4">
        <Navbar.Item className="flex flex-col space-y-2">
          <Navbar.Link className=""
            active={isActive(`/${companyId}/settings`)}
            href={`/${companyId}/settings`}
          >
            <span>Your profile</span>
          </Navbar.Link>
          <Navbar.Link
            active={isActive(`/${companyId}/settings/company`)}
            href={`/${companyId}/settings/company`}
          >
            <span>Company</span>
          </Navbar.Link>
          <Navbar.Link
            active={isActive(`/${companyId}/settings/team`)}
            href={`/${companyId}/settings/team`}
          >
            <span>Team</span>
          </Navbar.Link>
        </Navbar.Item>
      </Navbar.Nav>
    </Navbar.Root>
  );
}
