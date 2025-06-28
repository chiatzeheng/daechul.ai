import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'

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
}

const AdminTable = ({ data }: { data: LoanData[] }) => {
    if (data.length === 0) {
        return (
            <div className="p-8">
                <EmptyState
                    title="No loan applications"
                    description="No loan applications have been submitted yet."
                />
            </div>
        )
    }

    // Group loans by status
    const groupedLoans = data.reduce((acc, loan) => {
        if (!acc[loan.status]) {
            acc[loan.status] = []
        }
        acc[loan.status].push(loan)
        return acc
    }, {} as Record<string, LoanData[]>)

    const renderTable = (loans: LoanData[], status: string) => (
        <div key={status} className="mb-8">
            <div className="flex items-center justify-between mb-4 px-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <StatusBadge status={status} className="mr-2" />
                    {status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} Applications
                    <Badge variant="secondary" className="ml-2">
                        {loans.length}
                    </Badge>
                </h3>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Applicant</TableHead>
                        <TableHead className="font-semibold">Loan ID</TableHead>
                        <TableHead className="font-semibold">Submitted</TableHead>
                        <TableHead className="font-semibold">Last Updated</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loans.map((loanData) => (
                        <TableRow key={loanData.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={loanData.user.image} alt={loanData.user.name} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {loanData.user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">{loanData.user.name}</p>
                                        <p className="text-sm text-gray-600">{loanData.user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                    {loanData.loanId.slice(-8)}
                                </code>
                            </TableCell>
                            <TableCell className="text-gray-600">
                                {new Date(loanData.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </TableCell>
                            <TableCell className="text-gray-600">
                                {new Date(loanData.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={loanData.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <Link href={`/case/${loanData.loanId}/${loanData.userId}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            Review
                                        </Button>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Send Message
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Download Documents
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )

    return (
        <div className="space-y-8">
            {Object.entries(groupedLoans)
                .sort(([a], [b]) => {
                    const order = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED']
                    return order.indexOf(a) - order.indexOf(b)
                })
                .map(([status, loans]) => renderTable(loans, status))
            }
        </div>
    )
}

export default AdminTable