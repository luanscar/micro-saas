"use client";

import { usePathname } from "next/navigation";
import { useUserStore } from "@/providers/user-store-provider";

import { icons } from "@/lib/constants";

import UpgradeToPro from "./card/upgrade-to-pro";
import { ModeToggle } from "./mode-toggle";
import { Navbar } from "./navbar";
import { UserAccountNav } from "./user-account-nav";

export default function DesktopNav() {
  const pathname = usePathname();
  const activePath = pathname.split("/")[2];
  const user = useUserStore().getState().data;
  const company = useUserStore().getState().data?.company;
  if (!company) return;

  return (
    <Navbar.Root className="hidden h-full flex-col border-r border-border md:flex">
      <Navbar.Header className="p-4">
        <Navbar.Brand>
          <Navbar.BrandLogo
            src="https://avatar.vercel.sh/personal"
            alt="Logo"
          />
          <Navbar.BrandName>{company.name}</Navbar.BrandName>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Nav className="grow space-y-2 p-4">
        {company.sidebarOptions.map((s) => {
          let val;
          const result = icons.find((i) => i.value === s.icon);
          if (result) {
            val = <result.path className="h-8 w-8" />;
          }
          return (
            <Navbar.Item key={s.id} className="">
              <Navbar.Link
                active={activePath === s.name.toLocaleLowerCase()}
                href={`${s.link}`}
                className="flex items-center gap-4 rounded-md px-4 py-2 text-sm font-medium hover:bg-primary-foreground hover:text-primary"
              >
                {val}
                <Navbar.Label className="">{s.name}</Navbar.Label>
              </Navbar.Link>
            </Navbar.Item>
          );
        })}
      </Navbar.Nav>
      {user?.stripeSubscriptionId !== "" && <UpgradeToPro />}
      <Navbar.Footer className="flex justify-between border-t border-border p-4">
        <ModeToggle />
        <UserAccountNav />
      </Navbar.Footer>
    </Navbar.Root>
  );
}
