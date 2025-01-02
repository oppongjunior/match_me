"use client"
import React, {Key} from 'react';
import {Tab, Tabs} from "@nextui-org/tabs";
import {Member} from "@prisma/client";
import MemberCard from "@/app/members/MemberCard";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Props = {
    members: Member[],
    likeIds: string[]
}

const ListTab: React.FC<Props> = ({members, likeIds}) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const tabs = [
        {
            id: "source",
            label: "Members I have liked",
        },
        {
            id: "target",
            label: "Members that like me"
        },
        {
            id: "mutual",
            label: "Mutual Likes",
        }
    ];

    const handleChange = (key: Key) => {
        const params = new URLSearchParams(searchParams);
        params.set("type", key.toString());
        router.replace(`${pathName}?${params.toString()}`)
    }

    return (
        <div className="w-[95%] mx-auto mt-10">
            <Tabs aria-label="Dynamic tabs" items={tabs} onSelectionChange={(key) => handleChange(key)}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <div className=" gap-2 grid grid-cols-1 sm:grid-cols-4">
                            {members.length ? members?.map(item => <MemberCard key={item.id} member={item}
                                                                               likeIds={likeIds}/>)
                                : <div>No member for this filter</div>}
                        </div>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default ListTab;