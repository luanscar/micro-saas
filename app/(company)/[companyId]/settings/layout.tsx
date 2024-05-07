import { ReactNode } from "react";

import { Page } from "@/components/layout/page";
import { Sidebar } from "@/components/layout/sidebar";

import SettingsSidebar from "./_components/settings-sidebar";

type SettingsLayoutProps = {
  children: ReactNode;
  params: { companyId: string };
};

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title>Settings</Page.Title>
      </Page.Header>
      <Page.Main>
        <div className="grid w-full grid-cols-[18rem_1fr]">
          <SettingsSidebar companyId={params.companyId} />
          <div>{children}</div>
        </div>
      </Page.Main>
    </Page.Root>
  );
}
