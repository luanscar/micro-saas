"use server";

import { Company } from "@prisma/client";
import { uuid as v4 } from "uuidv4";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const getCompanyByUserId = async (userId: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      company: true,
    },
  });

  return data?.company as Company;
};

export const upsertCompany = async (company: Company) => {
  const loggedUser = await getCurrentUser();
  const response = await prisma.company.upsert({
    where: {
      id: company.id || v4(),
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
            name: "Settings",
            icon: "settings",
            link: `/${company.id}/settings`,
          },
          {
            name: "Companies",
            icon: "person",
            link: `/${company.id}/companies`,
          },
        ],
      },
    },
  });
  return response;
};
