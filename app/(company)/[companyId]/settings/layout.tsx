import { ReactNode } from "react";

import { Page } from "@/components/layout/page";

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
        <div className="grid w-full grid-cols-[14rem_1fr] ">
          {/* <SettingsSidebar companyId={params.companyId} /> */}
          <div>{children}</div>
        </div>
      </Page.Main>
    </Page.Root>
  );
}
