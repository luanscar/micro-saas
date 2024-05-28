"use server";

import { User } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const initUser = async (newUser: Partial<User>) => {
  const loggedUser = await getCurrentUser();

  if (!loggedUser) return;

  const userData = await prisma.user.upsert({
    where: { email: loggedUser.email as string },
    update: newUser,
    create: {
      id: loggedUser.id,
      image: loggedUser.image,
      email: loggedUser.email,
      name: `${loggedUser.name}`,
      role: newUser.role || "MODERATOR",
    },
  });

  return userData;
};

export const getTeamWithMembersByCompany = async (companyId: string) => {
  const teams = await prisma.team.findMany({
    include: {
      users: {
        include: {
          user: true,
        },
      },
      Company: true,
    },
  });

  return teams;
};

export const getUserWithCompanyWithPermissions = async (userId: string) => {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      company: {
        include: {
          sidebarOptions: true,
          users: {
            include: {
              permissions: true,
            },
          },
        },
      },
      permissions: true,
    },
  });

  return response;
};

export const createUser = async (user: Partial<User>) => {
  const response = await prisma.user.create({
    data: {
      ...user,
    },
  });

  return response;
};

export const upsertUser = async (user: Partial<User>) => {
  const response = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: { ...user },
    create: { ...user },
  });

  return response;
};

export const getAuthUserDetails = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      company: true,
      permissions: true,
    },
  });

  return userData;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getUserList = async () => {
  const response = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return response;
};
