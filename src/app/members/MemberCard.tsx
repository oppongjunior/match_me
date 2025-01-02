"use client"
import React from 'react';
import {Member} from "@prisma/client";
import {Card, CardFooter, Image} from "@nextui-org/react";
import Link from "next/link";
import {calculateAge} from "@/lib/util";
import LikeButton from "@/components/LikeButton";

type Props = {
    member: Member,
    likeIds: string[]
}

const MemberCard: React.FC<Props> = ({member, likeIds}) => {
    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <Card
            fullWidth
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
            className="flex relative justify-center"
        >
            <Image
                isZoomed
                alt={member.name}
                className="aspect-square object-cover"
                src={member.image as string}
                width={300}
            />
            <div onClick={preventLinkAction}>
                <div className="absolute top-[10px] right-10">
                    <LikeButton targetId={member.userId} hasLiked={likeIds?.includes(member.userId)}/>
                </div>
            </div>
            <CardFooter className="text-small justify-items-start">
                <div className="flex flex-col text-default-500">
                    <b>{member.name}, {calculateAge(member.dateOfBirth)}yrs</b>
                    <p className="text-default-500">{member.city}</p>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MemberCard;