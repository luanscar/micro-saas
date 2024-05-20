"use server";

import { teamSchema } from "@/schemas";
import { Team } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { Member } from "@/components/modals/edit-team-modal";

export const createTeam = async (
  values: z.infer<typeof teamSchema>,
  id: string,
) => {
  const response = await prisma.team.create({
    data: {
      teamName: values.name,
      companyId: id,
      users: {
        create: values.members.map((member) => ({
          user: {
            connect: {
              id: member.value,
            },
          },
        })),
      },
    },
  });
  return response;
};
export const updateTeam = async (team: Team, members: Member[]) => {
  const response = await prisma.team.update({
    data: {
      ...team,
      users: {
        deleteMany: {},
        create: members.map((member) => ({
          user: {
            connect: {
              id: member.value,
            },
          },
        })),
      },
    },
    where: {
      id: team.id,
    },
  });
  return response;
};
