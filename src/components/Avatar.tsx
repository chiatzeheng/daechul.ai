import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';

// Come back to this type to type out session type

export default function AvatarDialogComponent({ session }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className="bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
                    <AvatarImage src={session?.user.image} alt="avatar" />
                    <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-gray-100">
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={session?.user.image} alt="avatar" />
                        <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{session?.user.name}</h2>
                    <p className="text-gray-300">{session?.user.email}</p>
                    <Button variant="outline" className="bg-black mt-4">Edit Profile</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}