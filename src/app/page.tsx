import {Button} from "@nextui-org/button";
import {GoSmiley} from "react-icons/go";
import {auth} from "@/auth"

export default async function Home() {
    const session = await auth()
    return (
        <div>
            {session?.user ? <div>
                <pre>
                    {JSON.stringify(session, null, 3)}
                </pre>
            </div> : <Button variant="solid" color="primary" startContent={<GoSmiley/>}>Sign out</Button>}

        </div>
    );
}
