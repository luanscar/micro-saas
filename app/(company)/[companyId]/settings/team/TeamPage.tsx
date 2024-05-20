import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Page } from "@/components/layout/page";
import CreateTeamButton from "@/components/layout/team/create-team-button";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TeamPageProps } from "./page";

export default async function TeamPage({ params }: TeamPageProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const company = await prisma.company.findUnique({
    where: {
      id: params.companyId,
    },
    include: {
      users: {
        include: {
          teams: true,
        },
      },
    },
  });

  // const teamMembers = await prisma.user.findMany({
  //   where: {
  //     company: {
  //       id: params.companyId,
  //     },
  //   },
  //   include: {
  //     teams: { include: { users: true } },
  //     permissions: { include: { companies: true } },
  //   },
  // // });
  // if (!teamMembers) return null;
  // const teamMembers = await getTeamWithMembersByCompany(params.companyId);
  // const teams = await prisma.team.findMany({
  //   include: {
  //     users: {
  //       include: {
  //         user: true,
  //       },
  //     },
  //     companies: true,
  //   },
  // });
  return (
    <Page.Root>
      <Page.Container>
        <Page.Content className="">
          <CreateTeamButton title="Add" />
          {/* <pre>{JSON.stringify(teamMembers, null, 2)}</pre> */}
          <DataTable
            columns={columns}
            // actionButtonText={<CreateTeamButton teams={teamMembers} />}
            data={company}
          ></DataTable>
        </Page.Content>
      </Page.Container>
    </Page.Root>
  );
}
