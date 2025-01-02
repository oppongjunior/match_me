import React from 'react';
import {getMemberPhotosByUserId} from "@/app/actions/memberActions";
import {CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";


export default async function PhotosPage({params: {userId}}: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(userId);
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Photos
            </CardHeader>
            <Divider/>

            <CardBody>
                <div className="grid grid-cols-5 gap-5">
                    {photos?.map(photo => (
                        <Image key={photo.id} src={photo.url as string} alt="image of member" className="object-cover aspect-square"
                        />))}
                </div>
            </CardBody>
        </>
    );
};
