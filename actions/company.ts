"use server";

import { redirect } from "next/navigation";
import { companySchema, queueSchema } from "@/schemas";
import { Company, Queue, Role, User } from "@prisma/client";
import { uuid as v4 } from "uuidv4";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const usersOnQueue = async (queueId: string) => {
  const data = await prisma.userQueue.findMany({
    where: {
      queueId: queueId,
    },
    select: {
      user: true,
    },
  });

  return data;
};

export const createCompany = async (values: z.infer<typeof companySchema>) => {
  const loggedUser = await getCurrentUser();

  const response = await prisma.company.create({
    data: {
      ...values,
      users: {
        connect: {
          id: loggedUser?.id,
        },
      },
    },
  });

  return response;
};
export const editCompany = async (
  values: z.infer<typeof companySchema>,
  companyId: string,
) => {
  const response = await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      ...values,
    },
  });

  return response;
};

export const upsertQueue = async (
  queue: Queue,
  values: z.infer<typeof queueSchema>,
) => {
  const response = await prisma.queue.upsert({
    where: {
      id: queue.id,
    },
    create: {
      ...queue,
      userQueues: {
        create: values.members.map((member) => ({
          user: {
            connect: {
              id: member.value,
            },
          },
        })),
      },
    },
    update: {
      ...queue,
      userQueues: {
        deleteMany: {},
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

export const upsertCompany = async (company: Company) => {
  const loggedUser = await getCurrentUser();
  const response = await prisma.company.upsert({
    where: {
      id: company.id,
    },
    update: {
      ...company,
    },

    create: {
      ...company,
      users: {
        connect: {
          id: loggedUser?.id,
        },
      },

      sidebarOptions: {
        create: [
          {
            name: "Dashboard",
            icon: "chart",
            link: `/${company.id}/dashboard`,
          },
          {
            name: "Equipes",
            icon: "person",
            link: `/${company.id}/teams`,
          },
          {
            name: "Membros",
            icon: "shield",
            link: `/${company.id}/members`,
          },
        ],
      },
    },
  });
  return response;
};
export const createTeamUser = async (
  companyId: string,
  user: Partial<User>,
) => {
  if (user.role === "OWNER") return null;
  const response = await prisma.user.create({ data: { ...user } });
  return response;
};

export const verifyAndAcceptInvitation = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");
  const invitationExists = await prisma.invitation.findUnique({
    where: {
      email: user.email!,
      status: "PENDING",
    },
  });

  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.companyId, {
      email: invitationExists.email,
      companyId: invitationExists.companyId,
      id: user.id,
      name: user.name,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // await saveActivityLogsNotification({
    //   companyId: invitationExists?.companyId,
    //   description: `Joined`,
    //   subaccountId: undefined,
    // });

    if (userDetails) {
      await prisma.invitation.delete({
        where: { email: userDetails.email ?? "" },
      });

      return userDetails.companyId;
    } else return null;
  } else {
    const company = await prisma.user.findUnique({
      where: {
        email: user.email!,
      },
    });
    return company ? company.companyId : null;
  }
};

export const sendInvitation = async (
  role: Role,
  email: string,
  companyId: string,
) => {
  const invitationExists = await prisma.invitation.findUnique({
    where: {
      email,
    },
  });

  if (!invitationExists) {
    const response = await prisma.invitation.create({
      data: { email, companyId, role },
    });

    return { ok: response };
  } else return { error: "Já existe convite enviado!" };
};

export const getQueueWithUsers = async () => {
  const response = await prisma.queue.findMany({
    include: {
      userQueues: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      queueName: "asc",
    },
  });
  return response;
};

export const deleteQueue = async (id: string) => {
  const response = await prisma.queue.delete({
    where: {
      id: id,
    },
  });

  return response;
};
