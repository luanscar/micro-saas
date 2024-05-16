import React from "react";

import { Page } from "@/components/layout/page";
import { Grid } from "@/components/layout/grid";
import { useSearchParams } from "next/navigation";

export default function CompaniesPage() {

  return (
    <Page.Root>
      <Page.Header>
        <Page.Title>Companies</Page.Title>
      </Page.Header>
      <Grid cols={1}>
        Dash
      </Grid>
    </Page.Root>
  );
}
