"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calendar, Smile, Calculator, User, CreditCard, Settings } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { blurhash } from "@/lib/constants";

type Props = {
    id: string;
    role: string;
} & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export default function Navbar({ user }: { user: Props }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <nav className="flex h-20 bg-black items-center justify-between px-6">
            <div className="flex items-center space-x-6">
                <Link href="/dashboard">
                    <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                        Daechul.AI
                    </h1>
                </Link>
            </div>

            <div className="flex items-center space-x-6">


                <Dialog>
                    <DialogTrigger>
                        <Avatar className="bg-black transition-colors cursor-pointer">
                            <AvatarImage src={user?.image ?? blurhash} alt="avatar" />
                            <AvatarFallback>{user.name?.[0] ?? "J"}</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent className="bg-black text-gray-100">
                        <DialogHeader>
                            <DialogTitle>User Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={user.image ?? blurhash} alt="avatar" />
                                <AvatarFallback>{user.name?.[0] ?? "J"}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-300">{user.email}</p>
                            <Link href="api/auth/signout">
                                <Button className="bg-red-700">Sign Out</Button>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>


        </nav>
    );
}