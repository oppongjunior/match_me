"use server"
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    const userId = await getAuthUserId();
    try {
        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId,
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId: targetUserId
                }
            })
            console.log("after " + userId, targetUserId)
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    const userId = await getAuthUserId();
    try {
        const likeIds = await prisma.like.findMany(
            {where: {sourceUserId: userId}, select: {targetUserId: true}}
        )
        return likeIds.map(like => like.targetUserId);
    } catch (e) {
        throw e;
    }
}

export async function fetchLikedMembers(type = "source") {
    const userId = await getAuthUserId();
    try {
        switch (type) {
            case "source":
                return fetchSourceLikes(userId)
            case "target":
                return fetchTargetLikes(userId)
            case "mutual":
                return fetchMutualLikes(userId)
            default:
                return []
        }
    } catch (e) {
        throw e;
    }

}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {sourceUserId: userId},
        select: {targetMember: true}
    })
    return sourceList.map(item => item.targetMember);
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: {targetUserId: userId},
        select: {sourceMember: true}
    })
    return targetList.map(item => item.sourceMember);
}

async function fetchMutualLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {sourceUserId: userId},
        select: {targetUserId: true}
    })
    const likedIds = sourceList.map(item => item.targetUserId);
    const mutualFriends = await prisma.like.findMany({
        where: {
            targetUserId: userId,
            sourceUserId: {in: likedIds}
        },
        select: {sourceMember: true}
    })
    return mutualFriends.map(item => item.sourceMember)

}