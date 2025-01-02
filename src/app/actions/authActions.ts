"use server";

import {LoginSchema, registerSchema} from "@/lib/schema";
import bcrypt from "bcryptjs"
import {prisma} from "@/lib/prisma";
import {ActionResult} from "@/app/types";
import {User} from "@prisma/client";
import {auth, signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";


export async function registerUser(data: LoginSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);
        if (!validated.success) return {status: "error", error: validated.error.errors}
        const {name, email, password} = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({where: {email}})
        if (existingUser) return {status: "error", error: "User already exists"}

        const user = await prisma.user.create({data: {name, email, passwordHash: hashedPassword}})
        return {status: "success", data: user};

    } catch (error) {
        console.log(error);
        return {status: "error", error: "Something went wrong"};
    }
}

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result)
        return {status: "success", data: "Logged In"};
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {status: "error", error: "Invalid credentials"}
                default:
                    return {status: "error", error: "Something went wrong"}
            }
        } else {
            return {status: "error", error: "Something else went wrong"}
        }
    }
}

export async function geUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({where: {email}});
}
export async function signOutUser(){
    await signOut({redirectTo:"/"})
}
export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id
    if (!userId) throw new Error("Unauthorized")
    return userId;
}