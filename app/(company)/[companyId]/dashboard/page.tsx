import React from "react";

import { Analytics } from "@/components/analytics";
import { Page } from "@/components/layout/page";

export default function DashboardPage() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title>Dashboard</Page.Title>
      </Page.Header>
      <Page.Main>
        <Page.MainContainer>
          <Analytics />
        </Page.MainContainer>
      </Page.Main>
    </Page.Root>
  );
}
