import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    <Page.Root className="h-full">
      <Page.Header className="border-b border-border p-4">
        <Page.Title>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${params.companyId}/settings`}>
                  Configurações
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Page.Title>
      </Page.Header>
      <Grid
        className="h-[calc(100vh-56.8px)] md:grid-cols-[14rem_1fr]"
        cols={1}
      >
        <SettingsSidebar companyId={params.companyId} />
        {children}
      </Grid>
    </Page.Root>
  );
}
