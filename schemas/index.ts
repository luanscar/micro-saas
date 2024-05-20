import { Role } from "@prisma/client";
import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(3, { message: "Company name is required" }),
});

export const userSchema = z.object({
  name: z.string().min(3, { message: "User name is required" }),
  email: z.string().email(),
  role: z.enum(["ADMIN", "OWNER", "MODERATOR"]),
  //   role: z.array(z.enum(Role)),
});

const members = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
export const teamSchema = z.object({
  name: z.string().min(3, { message: "Team name is required" }),
  members: z.array(members).min(1),
});
