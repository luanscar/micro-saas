import { z } from "zod";

export const companySchema = z.object({
    companyName: z.string().min(3, {message: "Company name is required"})
})

