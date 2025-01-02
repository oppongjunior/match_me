"use client"
import React from 'react';
import {Member} from "@prisma/client";
import {Card, CardBody} from "@nextui-org/card";
import {CardFooter, Image} from "@nextui-org/react";
import {calculateAge} from "@/lib/util";
import {Divider} from "@nextui-org/divider";
import Link from "next/link";
import {Button} from "@nextui-org/button";
import {usePathname, useRouter} from "next/navigation";

type Props = {
    member: Member
}
const MemberSidebar: React.FC<Props> = ({member}) => {
    const router = useRouter();
    const path = usePathname();
    return (
        <Card className="w-full mt-10 items-center h-[80vh]">
            <Image
                height={200}
                width={200}
                src={member.image as string}
                alt="user profile main image"
                className="rounded-full mt-6"
            />
            <CardBody>
                <div className="text-center">
                    <h2 className="font-bold">{member.name}, {calculateAge(member.dateOfBirth)} yrs</h2>
                    <p>{member.city}, {member.country}</p>
                </div>
                <Divider/>
                <div className="flex flex-col mt-10 gap-5">
                    <Link href={`/members/${member.userId}/`} className={`${path === `/members/${member.userId}` && 'text-secondary'}`} >Profile</Link>
                    <Link href={`/members/${member.userId}/photos`} className={`${path === `/members/${member.userId}/photos` && 'text-secondary'}`}>Photos</Link>
                    <Link href={`/members/${member.userId}/chat`} className={`${path === `/members/${member.userId}/chat` && 'text-secondary'}`}>Chat</Link>
                </div>
            </CardBody>
            <CardFooter>
                <Button fullWidth className="bg-pink-600 text-default-100" onPress={()=>router.back()}>Go Back</Button>
            </CardFooter>
        </Card>
    );
};

export default MemberSidebar;