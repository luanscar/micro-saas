import { notFound } from "next/navigation";
import {
  getAuthUserDetails,
  getUserWithCompanyWithPermissions,
} from "@/actions/user";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import CompanyDetails from "@/components/forms/company-details";
import { Page } from "@/components/layout/page";
import Team from "@/components/layout/team";

import { columns } from "./columns";
import { DataTable } from "./data-table";

type TeamPageProps = {
  params: { companyId: string };
};

export default async function TeamPage({ params }: TeamPageProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  // const teamMembers = await prisma.company.findMany({
  //   where: {
  //     id: params.companyId,
  //   },
  //   include: {
  //     users: true,
  //   },
  // });

  const teamMembers = await prisma.user.findMany({
    where: {
      NOT: { id: loggedUser.id },
      companyId: params.companyId,
    },
    include: {
      company: true,
      permissions: true,
    },
  });

  return (
    <Page.Root>
      <Page.Main>
        <Page.MainContainer className="flex grow flex-col !overflow-x-hidden">
          {/* <pre>{JSON.stringify(teamMembers, null, 2)}</pre> */}
          <DataTable columns={columns} data={teamMembers}></DataTable>
        </Page.MainContainer>
      </Page.Main>
    </Page.Root>
  );
}
