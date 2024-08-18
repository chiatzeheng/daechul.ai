import React from 'react';
import { api } from '@/trpc/server';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import InfoItem from '@/components/InfoItem';

const LoanPage = async ({ params }: { params: { slug: string } }) => {
    const data = await api.loan.getLoanByID({ id: params.slug[0] ?? '1' });

    if (!data) {
        return <div>Loan not found</div>;
    }

    const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
    const formatDate = (date: Date) => new Date(date).toLocaleDateString();

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-4">
                <Link href="/dashboard" passHref>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Loans
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{data.businessName}</CardTitle>
                        <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-800">
                            {data.businessType}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Tax ID" value={data.taxId} />
                        <InfoItem label="Year Established" value={data.yearEstablished} />
                        <InfoItem label="Annual Revenue" value={formatCurrency(data.annualRevenue)} />
                        <InfoItem label="Employees" value={data.numberOfEmployees} />
                        <InfoItem label="Address" value={`${data.businessAddress}, ${data.city}, ${data.state}, ${data.zipCode}`} />
                        <InfoItem label="Contact" value={`${data.contactFirstName} ${data.contactLastName}`} />
                        <InfoItem label="Email" value={data.contactEmail} />
                        <InfoItem label="Phone" value={data.contactPhone} />
                        <InfoItem label="Loan Amount" value={formatCurrency(data.amount)} />
                        <InfoItem label="Loan Purpose" value={data.loanPurpose} />
                        <InfoItem label="Property Type" value={data.propertyType} />
                        <InfoItem label="Property Use" value={data.propertyUse} />
                        <InfoItem label="Credit Score" value={data.creditScore} />
                        <InfoItem label="Down Payment" value={formatCurrency(data.downPayment)} />
                        <InfoItem label="Co-Borrower" value={data.hasCoBorrower ? 'Yes' : 'No'} />
                        <InfoItem label="Created At" value={formatDate(data.createdAt)} />
                        <InfoItem label="Updated At" value={formatDate(data.updatedAt)} />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Loan Status</h2>
                        <ul className="space-y-2">
                            {data.loanBridge.map((bridge) => (
                                <li key={bridge.id} className="flex justify-between items-center">
                                    <Badge variant="outline" className="text-xs px-2 py-1">
                                        {bridge.status}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                        Updated: {formatDate(bridge.updatedAt)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};



export default LoanPage;