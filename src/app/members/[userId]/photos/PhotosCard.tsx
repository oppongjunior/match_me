"use client"
import React from 'react';
import {Photo} from "@prisma/client";
import {CardBody, Image} from "@nextui-org/react";

type Props = {
    photo: Photo
}
const PhotosCard: React.FC<Props> = ({photo}) => {
    return (
        <>
            <CardBody>
                <div className="grid grid-cols-5 gap-5">
                    <Image
                        src={photo.url as string}
                        alt="image of member"
                        className="object-cover aspect-square"
                    />
                </div>
            </CardBody>
        </>
    );
};

export default PhotosCard;