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
    <Grid cols={"[18rem_1fr]"}>
      <div className="h-full bg-zinc-600">sidebar</div>
      {/* <Sidebar details={details} /> */}
      <div>ss</div>
    </Grid>
  );
};

export default CompanyIdLayout;
