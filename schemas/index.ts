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
export const teamSchema = z.object({
  name: z.string().min(3, { message: "Team name is required" }),
  //   role: z.array(z.enum(Role)),
});
