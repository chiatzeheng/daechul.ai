import React from 'react';
import { api } from '@/trpc/server';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ActionPanel from './Action';
import LoanDetails from './Loan';
import DocumentList from './Document';
import FinancialReport from './FinancialReport';




const LoanDashboard = async ({ params }: { params: { slug: string, userId: string } }) => {
    const data = await api.loan.getAdminLoanByID({ id: params.slug[0] ?? '1', userId: params.slug[1] ?? '1' });

    const passedData = data
    delete passedData.loanBridge

    const documents = await api.loan.getDocuments({ userId: params.slug[1] ?? '1' })

    console.log(documents);

    if (!data) {
        return <div>Loan not found</div>;
    }

    const docs = []

    for (const document of documents) {
        docs.push(document.url)
    }



    return (
        <div className=" p-4">
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
                <div className="col-span-1 row-span-2">
                    <DocumentList documents={documents} />
                </div>
                <div>
                </div>
            </div>
            <FinancialReport data={passedData} documents={docs} />
            <ActionPanel id={data?.loanBridge?.[0]?.loanId ?? ''} userId={data?.loanBridge?.[0]?.userId ?? ''} />

        </div>
    );
};

export default LoanDashboard;