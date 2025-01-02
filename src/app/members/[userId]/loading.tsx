import React from 'react';
import {Spinner} from "@nextui-org/spinner";

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-full ">
            <Spinner color="danger" label="Loading..." />
        </div>
    );
};

export default Loading;