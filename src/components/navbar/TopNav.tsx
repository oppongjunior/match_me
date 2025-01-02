import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import Link from "next/link";
import {Button} from "@nextui-org/button";
import {GiSelfLove} from "react-icons/gi";
import NavLink from "@/components/navbar/NavLink";
import {auth} from "@/auth";
import UserMenu from "@/components/navbar/UserMenu";

const TopNav = async () => {
    const session = await auth()
    return (
        <Navbar position="static" className="bg-pink-600" maxWidth="full" classNames={{
            item: [
                "text-xl", "text-white", "uppercase", "data-[active=true]:text-yellow-200"
            ]
        }}>
            <NavbarBrand>
                <GiSelfLove
                    size={40}
                    className="text-gray-200"
                />
                <div className="font-bold text-3xl flex">
                    <span className="text-gray-200">
                        MatchMe
                    </span>
                </div>

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavLink href="/members" label="members"/>
                <NavLink href="/lists" label="Lists"/>
                <NavLink href="/messages" label="messages"/>
            </NavbarContent>
            <NavbarContent justify="end">
                {session?.user ? <UserMenu user={session.user}/> : <>
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} href="/register" variant="bordered" className="text-white">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </>}

            </NavbarContent>
        </Navbar>
    );
};

export default TopNav;