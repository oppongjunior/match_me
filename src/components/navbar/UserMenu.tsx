"use client"
import React from 'react';
import {Session} from "next-auth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User} from "@nextui-org/react";
import {signOutUser} from "@/app/actions/authActions";

type Props = {
    user: Session["user"]
}
const UserMenu: React.FC<Props> = ({user}) => {
    return (
        <Dropdown
            showArrow
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
            }}
            radius="sm"
        >
            <DropdownTrigger>
                <User
                    avatarProps={{
                        size: "sm",
                        src: user?.image as string,
                        name: user?.name?.substring(0, 3),
                        className: "text-default-100"
                    }}
                    classNames={{
                        name: "text-default-100 font-bold",
                        description: "text-default-300",
                    }}
                    description={user?.email}
                    name={user?.name}
                />

            </DropdownTrigger>
            <DropdownMenu
                aria-label="Custom item styles"
                className="p-3"
                disabledKeys={["profile"]}
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                <DropdownSection showDivider aria-label="Profile & Actions">
                    <DropdownItem key="dashboard">Dashboard</DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" onPress={() => signOutUser()}>Log Out</DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserMenu;