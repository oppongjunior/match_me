"use client"
import React from 'react';
import {NavbarItem} from "@nextui-org/navbar";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
    href: string;
    label: string;
}
const NavLink: React.FC<Props> = ({href, label}) => {
    const pathName = usePathname();
    return (
        <NavbarItem isActive={pathName === href}>
            <Link color="foreground" href={href}>
                {label}
            </Link>
        </NavbarItem>
    );
}

export default NavLink;