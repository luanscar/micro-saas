import React from "react";
import { notFound } from "next/navigation";
import { getUserWithCompanyWithPermissions } from "@/actions/user";

import { getCurrentUser } from "@/lib/session";
import { Grid } from "@/components/layout/grid";
import Sidebar from "@/components/shared/sidebar";

type CompanyIdProps = {
  children: React.ReactNode;
  params: { companyId: string };
};

const CompanyIdLayout = async ({ children, params }: CompanyIdProps) => {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const details = await getUserWithCompanyWithPermissions(loggedUser.id);

  if (!details) return null;

  return (
    <Grid cols={1} className="h-screen md:grid-cols-[18rem_1fr]">
      <Sidebar details={details} />
      {children}
    </Grid>
  );
};

export default CompanyIdLayout;
