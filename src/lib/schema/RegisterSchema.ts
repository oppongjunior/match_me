import {z} from "zod"

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    name: z.string()
})

export type RegisterSchema = z.infer<typeof registerSchema>;