import type {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {loginSchema} from "@/lib/schema";
import {geUserByEmail} from "@/app/actions/authActions";
import {compare} from "bcryptjs";

export default {
    providers: [
        Credentials({
            name: "credentials",
            async authorize(cred) {
                const validated = loginSchema.safeParse(cred)
                if (validated.success) {
                    const {email, password} = validated.data;
                    const user = await geUserByEmail(email);
                    if (user && (await compare(password, user.passwordHash as string))) return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig