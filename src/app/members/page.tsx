import React from 'react';
import {getMembers} from "@/app/actions/memberActions";
import MemberCard from "@/app/members/MemberCard";
import {fetchCurrentUserLikeIds} from "@/app/actions/likeActions";

const Page = async () => {
    const members = await getMembers();
    const likeIds = await fetchCurrentUserLikeIds();
    return (
        <div className="w-[95%] mx-auto mt-10 gap-2 grid grid-cols-1 sm:grid-cols-4">
            {members?.map(item => <MemberCard key={item.id} member={item} likeIds={likeIds}/>)}
        </div>
    );
};

export default Page;