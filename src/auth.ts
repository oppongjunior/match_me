import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma";


export const {auth, handlers, signIn, signOut} = NextAuth({
    callbacks:{
        async jwt({token}){
            return token;
        },
        async session({token, session}){
            if(session.user && token){
                session.user.id = token.sub as string;
            }
            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    ...authConfig
})