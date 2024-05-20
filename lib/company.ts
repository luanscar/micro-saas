"use server";

import { auth } from "@/auth";

import { prisma } from "./db";

export async function getUsersByCompany() {
  const session = await auth();

  const response = await prisma.user.findMany({
    where: {
      company: {
        users: {
          some: {
            id: session?.user.id,
          },
        },
      },
    },
  });

  return response;
}
