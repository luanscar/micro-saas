import { ReactNode } from "react";

import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";

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
    <Page.Root className="">
      <Page.Header className="border-b border-border p-4">
        <Page.Title>Settings</Page.Title>
      </Page.Header>
      <Grid className="md:grid-cols-[14rem_1fr]" cols={1}>
        <div className="hidden border-r border-border md:grid">
          settings sidebar
        </div>
        {/* <SettingsSidebar companyId={params.companyId} /> */}
        {children}
      </Grid>
    </Page.Root>
  );
}
