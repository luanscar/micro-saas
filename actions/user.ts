"use server";

import { UserWithCompanyWithPermissions } from "@/types";
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
      role: newUser.role || "USER",
    },
  });

  return userData;
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
        },
      },
      permissions: true,
    },
  });

  return response as UserWithCompanyWithPermissions;
};
