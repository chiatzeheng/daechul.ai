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

function capitalizeFirst(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


const AdminTables = ({ data }: { data: LoanData[] }) => {

    console.log(data);
    // Group loans by status
    const groupedLoans = data.reduce((acc, loan) => {
        if (!acc[loan.status]) {
            acc[loan.status] = [];
        }
        acc[loan?.status].push(loan);
        return acc;
    }, {} as Record<string, LoanData[]>);

    const renderTable = (loans: LoanData[], status: string) => (
        <div key={status} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{capitalizeFirst(status)} Loans</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Icon</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loans.map((loanData) => (

                        <TableRow key={loanData.id} className="cursor-pointer hover:bg-gray-50">

                            <TableCell>
                                <Link href={`/case/${loanData.loanId}/${loanData.userId}`} className="flex items-center">

                                    {loanData.user.email}</Link></TableCell>
                            <TableCell>{loanData.loanId}</TableCell>

                            <TableCell>{new Date(loanData.createdAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={loanData.user.image} alt={`${loanData.user.name}'s avatar`} />
                                </Avatar>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="rounded-lg col-span-3 p-8 bg-white">

            {Object.entries(groupedLoans).map(([status, loans]) => renderTable(loans, status))}
        </div>
    );
};

export default AdminTables;