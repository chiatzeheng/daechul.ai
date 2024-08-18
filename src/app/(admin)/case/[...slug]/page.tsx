import React from 'react';
import { api } from '@/trpc/server';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ActionPanel from './Action';
import LoanDetails from './Loan';
import DocumentList from './Document';




const LoanDashboard = async ({ params }: { params: { slug: string, userId: string } }) => {
    const data = await api.loan.getAdminLoanByID({ id: params.slug[0] ?? '1', userId: params.slug[1] ?? '1' });

    const documents = await api.loan.getDocuments({ userId: params.slug[1] ?? '1' });

    console.log(documents)

    if (!data) {
        return <div>Loan not found</div>;
    }

    const mockDocuments = [
        { name: "Business License" },
        { name: "Financial Statements" },
        { name: "Tax Returns" },
        { name: "Property Appraisal" },
    ];

    console.log(data)
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-4">
                <Link href="/homepage" passHref>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Loans
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 row-span-2">
                    <LoanDetails data={data} />
                </div>
                <div>
                    <DocumentList documents={mockDocuments} />
                </div>
                <div>
                    <ActionPanel id={data.id} />
                </div>
            </div>
        </div>
    );
};

export default LoanDashboard;