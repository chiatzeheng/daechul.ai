import React, { Suspense } from 'react';
import { cache } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultValues, formSchema } from '@/lib/constants';

const stages = [
    { id: 'business', title: 'Business Information' },
    { id: 'address', title: 'Business Address' },
    { id: 'contact', title: 'Contact Information' },
    { id: 'loan', title: 'Loan Details' },
    { id: 'financial', title: 'Financial Information' },
    { id: 'documents', title: 'Document Upload' },
    { id: 'review', title: 'Review and Submit' },
];

const ClientLoanForm = dynamic(() => import('./ClientLoanForm'), { ssr: false });

const CachedClientLoanForm = cache(() => {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <ClientLoanForm stages={stages} defaultValues={defaultValues} formSchema={formSchema} />
        </Suspense>
    );
});

const MultiStageLoanApplication = () => {
    return (
        <div className="h-screen bg-black p-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Loan Application</h1>
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Loan Application Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <CachedClientLoanForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default MultiStageLoanApplication;
