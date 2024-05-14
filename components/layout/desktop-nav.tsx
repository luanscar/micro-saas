import React from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/providers/user-store-provider";
import { HomeIcon } from "lucide-react";

import { icons } from "@/lib/constants";

import { Grid } from "./grid";
import { Navbar } from "./navbar";

export default function DesktopNav() {
  const pathname = usePathname();
  const company = useUserStore().getState().data?.company;
  if (!company) return;

  return (
    <Navbar.Root className="">
      <Navbar.Header className="hidden md:flex">
        <Navbar.Brand>
          <Navbar.BrandLogo
            src="https://avatar.vercel.sh/personal"
            alt="Logo"
          />
          <Navbar.BrandName>{company.name}</Navbar.BrandName>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Nav className="flex h-full items-center justify-around md:flex-col md:items-start md:justify-start">
        {company.sidebarOptions.map((s) => {
          let val;
          const result = icons.find((i) => i.value === s.icon);
          if (result) {
            val = <result.path className="h-8 w-8" />;
          }
          return (
            <Navbar.Item key={s.id} className="">
              <Navbar.Link active={true} href={`${s.link}`}>
                {val}
                <Navbar.Label>{s.name}</Navbar.Label>
              </Navbar.Link>
            </Navbar.Item>
          );
        })}
      </Navbar.Nav>
    </Navbar.Root>
  );
}
