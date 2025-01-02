"use server"
import {prisma} from "@/lib/prisma";
import {auth} from "@/auth";


export async function getMembers() {
    const session = await auth();
    if (!session.user) return null;
    try {
        return await prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export async function getMemberByUserId(userId) {
    try {
        return await prisma.member.findUnique({where: {userId}})
    } catch (e) {
        console.log(e)
    }
}

export async function getMemberPhotosByUserId(userId) {
    try {
        const result = await prisma.member.findUnique({where: {userId}, select: {photos: true}})
        return result.photos?.map(p => p);
    } catch (e) {
        console.log(e)
    }
}