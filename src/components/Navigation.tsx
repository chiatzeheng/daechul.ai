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
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';



type Props = {
    name: string
    email: string
    image: string
    role: string
}

export default function Navbar({ user }: { user: Props }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])


    return (
        <nav className="flex h-16 items-center bg-black pt-4">
            <div className="container flex justify-between  items-center">
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        <h1 className=" text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500  hover:">Loan.AI</h1>
                    </Link>
                    <Link href="/loans" className="text-white hover:text-gray-300">View Loans</Link>
                    <Link href="/apply" className="text-white hover:text-gray-300">Loan Application</Link>
                    {
                        user.role === 'admin' ? <Link href="/admin" className="text-white hover:text-gray-300">Admin</Link> : null
                    }
                </div>

                <div className="flex items-end space-x-12 justify-center">
                    {/* <button
                        onClick={() => setOpen(true)}
                        className="flex flex-end space-x-3 x-3  rounded-bg-gray-700 text-white"
                    >
                        <Search className="h-4 w-4" />
                        <span className="text-sm">Search</span>
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button> */}

                    <Dialog>
                        <DialogTrigger>
                            <Avatar className="bg-black  transition-colors cursor-pointer">
                                <AvatarImage src={user.image} alt="avatar" />
                                <AvatarFallback>{user.name?.[0] ?? "John"}</AvatarFallback>
                            </Avatar>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-gray-100">
                            <DialogHeader>
                                <DialogTitle>User Profile</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={user.image} alt="avatar" />
                                    <AvatarFallback>{user.name?.[0] ?? "John"}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-gray-300">{user.email}</p>
                                <Link href="api/auth/signout">
                                    <Button className="bg-red-700" >Sign Out</Button>
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div >
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile className="mr-2 h-4 w-4" />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </nav >
    );
}