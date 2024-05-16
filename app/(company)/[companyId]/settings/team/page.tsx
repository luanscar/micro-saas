import { notFound } from "next/navigation";
import { getTeamWithMembersByCompany } from "@/actions/user";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Page } from "@/components/layout/page";

import { columns } from "./columns";
import DataTable from "./data-table";

type TeamPageProps = {
  params: { companyId: string };
};

export default async function TeamPage({ params }: TeamPageProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

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

  const teamMembers = await getTeamWithMembersByCompany(params.companyId);

  console.log(teamMembers);

  return (
    <Page.Root>
      <Page.Container>
        <Page.Content className="">
          {/* <pre>{JSON.stringify(teamMembers, null, 2)}</pre> */}
          <DataTable columns={columns} data={teamMembers}></DataTable>
        </Page.Content>
      </Page.Container>
    </Page.Root>
  );
}
