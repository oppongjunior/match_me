import React from 'react';
import {CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";

const Page = () => {
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Chat
            </CardHeader>
            <Divider/>
            <CardBody>chat goes here</CardBody>
        </>
    );
};

export default Page;