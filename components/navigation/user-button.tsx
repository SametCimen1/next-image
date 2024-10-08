'use client';

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Suspense, useState } from "react";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, TruckIcon, User } from "lucide-react";

import { useRouter } from "next/navigation";


export const UserButton = ({user}: Session) => {
    const router = useRouter();
    const [theme, setTheme] = useState("light");
    const [checked, setChecked] = useState(false);

    function setSwitchState(){
        switch(theme){
            case "dark":
                return setChecked(true);
            case "light":
                return setChecked(false);
            case " system":
                return setChecked(false);
        }
    }

    if(user)
        return(
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8">
                            {(user.image && user.name) && (

                                    <Image
                                        src = {user.image}
                                        alt = {user.name}
                                        fill = {true}
                                    />

                             )
                            }
                            {!user.image &&
                                <AvatarFallback>
                                    <div className="font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                </AvatarFallback>
                            }
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-6" align="end">
                    <div className="mb-4 p-4 flex flex-col items-center rounded-lg bg-primary/10">
                        {(user.image && user.name) && (
                                <Image
                                    className="rounded-full"
                                    src = {user.image}
                                    alt = {user.name}
                                    width={36}
                                    height={36}
                                />
                                )
                        }
                        <p className="font-bold text-xs">{user.name}</p>
                        <span className="text-xs font-medium text-secondary-foreground">{user.email}</span>
                    </div>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => router.push('/dashboard')}  className=" group py-2 font-medium cursor-pointer transition-all duration-500">
                        <User size ={14} className="mr-3 "/>Dashboard
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}  className=" group py-2 font-medium cursor-pointer transition-all duration-500">
                        <Settings size ={14} className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"/>Settings
                    </DropdownMenuItem> */}
                    <DropdownMenuItem  className=" group py-2 font-medium cursor-pointer transition-all duration-500 focus:bg-destructive/30" onClick = {() => signOut()}>
                       <LogOut size = {14} className="mr-3 group-hover:scale-75 transition-all duration-300 ease-in-out"/>Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        )
}