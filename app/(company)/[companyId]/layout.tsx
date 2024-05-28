import React, { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getQueueWithUsers } from "@/actions/company";
import { getUserList, getUserWithCompanyWithPermissions } from "@/actions/user";
import AppInitializer from "@/providers/app-initializer";

import { getCurrentUser } from "@/lib/session";
import { Grid } from "@/components/layout/grid";
import WaSidebar from "@/components/wa/wa-sidebar";

const CompanyIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { companyId: string };
}) => {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const data = await getUserWithCompanyWithPermissions(loggedUser.id);

  const userList = await getUserList();

  const queueWithUsers = await getQueueWithUsers();

  // if (queueWithUsers) {
  //   return <pre>{JSON.stringify(queueWithUsers, null, 2)}</pre>;
  // }

  if (!data) return null;

  return (
    <AppInitializer queueList={queueWithUsers} userList={userList}>
      <Grid cols={1} className="h-screen md:grid-cols-[28rem_1fr]">
        <WaSidebar companyId={params.companyId} />
        {children}
      </Grid>
    </AppInitializer>
  );
};

export default CompanyIdLayout;
