import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

type LoanData = {
    id: string,
    userId: string,
    loanId: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
    user: {
        id: string,
        name: string,
        email: string,
        emailVerified: null,
        image: string
        role: string
    }
};

const AdminTable = ({ data }: { data: LoanData[] }) => {

    return (
        <div className="rounded-lg col-span-3 p-8 bg-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Pending Loans</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Icon</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((loanData) => (

                        < TableRow key={loanData.id} className="cursor-pointer hover:bg-gray-50 m-8" >
                            <TableCell className="font-medium">
                                <Link href={`/case/${loanData.loanId}/${loanData.userId}`} className="flex items-center">
                                    <span className="ml-2">{loanData.user.name}</span>
                                </Link>
                            </TableCell>
                            <TableCell>{loanData.status}</TableCell>
                            <TableCell>{loanData.user.email}</TableCell>
                            <TableCell>{new Date(loanData.createdAt).toLocaleString()}</TableCell>
                            <TableCell> <Avatar className="h-8 w-8">
                                <AvatarImage src={loanData.user.image} alt={`${loanData.user.name}'s avatar`} />
                            </Avatar></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default AdminTable;