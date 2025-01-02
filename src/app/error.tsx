'use client' // Error boundaries must be Client Components

import {Card, CardHeader} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import {BiSolidError} from "react-icons/bi";

export default function errorPage({reset, error}: { error: Error & { digest?: string }, reset: () => void }) {

    return (
        <div className="h-[90vh] flex items-center">
            <Card className="w-10/12 md:w-3/12 h-[30%] m-auto flex justify-center text-center">
                <CardHeader className="flex justify-center">
                    <div className="flex flex-row items-center justify-center text-default">
                        <BiSolidError size={30}/>
                        <h1 className="text-3xl font-semibold">Error</h1></div>
                </CardHeader>
                <p className="text-pink-600">{error.message}</p>
                <div className="my-3">
                    <Button className="bg-pink-600 text-default-100" onPress={() => reset()}>Try again</Button>
                </div>
            </Card>
        </div>
    )
}