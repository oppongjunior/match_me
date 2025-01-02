import React from 'react';
import ListTab from "@/app/lists/ListTab";
import {fetchCurrentUserLikeIds, fetchLikedMembers} from "@/app/actions/likeActions";

const Page = async ({searchParams}: {searchParams: { type:string }}) => {
    const members = await fetchLikedMembers(searchParams.type)
    const likeIds = await fetchCurrentUserLikeIds();
    return (
        <div>
            <ListTab members={members} likeIds={likeIds}/>
        </div>
    );
};

export default Page;