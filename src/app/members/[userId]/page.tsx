import React from 'react';
import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";

const MemberDetailsPage = async ({params}: { params: { userId: string } }) => {
    const userId = await params.userId;
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Profile
            </CardHeader>
            <Divider/>
            <CardBody>{member.description}</CardBody>
        </>
    );
};

export default MemberDetailsPage