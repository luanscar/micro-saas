import { notFound } from "next/navigation";
import { Company, Team, User } from "@prisma/client";
import { Button } from "react-day-picker";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Page } from "@/components/layout/page";
import CreateTeamButton from "@/components/layout/team/create-team-button";

import { columns } from "./columns";
import { DataTable } from "./data-table";

type TeamPageProps = {
  params: { companyId: string };
};

export type CompanyWithUsersWithTeams = Company & {
  users: User[];
} & { teams: Team[] };

export default async function TeamPage({ params }: TeamPageProps) {
  const loggedUser = await getCurrentUser();

  if (!loggedUser || !loggedUser.id) return notFound();

  const company = await prisma.company.findUnique({
    where: {
      id: params.companyId,
    },
    include: {
      users: {
        orderBy: {
          name: "asc",
        },
      },
      teams: {
        orderBy: {
          teamName: "asc",
        },
      },
    },
  });

  const companies = await prisma.company.findMany({
    include: {
      users: {
        include: {
          teams: true,
        },
      },
      teams: true,
    },
  });

  const teams = await prisma.team.findMany({
    include: {
      users: {
        include: {
          user: true,
        },
      },
      companies: {
        include: {
          users: true,
        },
      },
    },
  });

  return (
    <Page.Root>
      <Page.Container>
        <Page.Content className="">
          {/* <pre>{JSON.stringify(teamMembers, null, 2)}</pre> */}
          <DataTable
            columns={columns}
            // actionButtonText={<CreateTeamButton teams={teamMembers} />}
            data={teams}
          ></DataTable>
        </Page.Content>
      </Page.Container>
    </Page.Root>
  );
}
