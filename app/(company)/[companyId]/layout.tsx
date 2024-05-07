import React from "react";
import { notFound } from "next/navigation";
import { getUserWithCompanyWithPermissions } from "@/actions/user";

import { getCurrentUser } from "@/lib/session";

import NavigationSidebar from "./_components/navigation-sidebar";

type CompanyIdProps = {
  children: React.ReactNode;
  params: { companyId: string };
};

const CompanyIdLayout = async ({ children, params }: CompanyIdProps) => {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const userDetails = await getUserWithCompanyWithPermissions(loggedUser.id);

  return (
    <div className="grid h-screen w-screen grid-cols-[18rem_1fr]">
      {/* <pre>{JSON.stringify(userDetails, null, 2)}</pre> */}

      <NavigationSidebar data={userDetails} />

      <main className="">{children}</main>
    </div>
  );
};

export default CompanyIdLayout;
