import React from "react";
import { notFound } from "next/navigation";
import { getUserWithCompanyWithPermissions } from "@/actions/user";

import { getCurrentUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CompanyDetails from "@/components/forms/company-details";
import { Page } from "@/components/layout/page";

export default async function CompanyPage() {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const userDetails = await getUserWithCompanyWithPermissions(loggedUser.id);

  const company = userDetails.company;
  return (
    <Page.Root>
      <Page.Main>
        <Page.MainContainer className="flex flex-1 flex-col items-center justify-center">
          <CompanyDetails data={company} />
        </Page.MainContainer>
      </Page.Main>
    </Page.Root>
  );
}
