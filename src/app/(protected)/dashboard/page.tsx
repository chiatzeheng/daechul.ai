import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { BadgeDollarSign, ChevronRight, CreditCard } from 'lucide-react';
import { getServerAuthSession } from '@/server/auth';
import Navigation from '@/components/Navigation';
import Avatar from '@/components/Avatar';
import Loan from '@/components/Loan';
import { redirect } from 'next/navigation'

const loans = [
    { name: 'Home Loan', amount: 250000, progress: 30 },
    { name: 'Car Loan', amount: 35000, progress: 50 },
    { name: 'Personal Loan', amount: 10000, progress: 75 },
];

export default async function LoanApplicationPage() {
    const session = await getServerAuthSession()

    return (
        <div className="min-h-screen bg-black text-gray-100">
            <nav className="bg-gray-700 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <Navigation />
                    <Avatar session={session} />
                </div>
            </nav>

            <main className="container mx-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-blue-600 to bg-white text-white shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                                <BadgeDollarSign className="mr-2" />
                                Apply for new loan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-lg">Get quick approval on your next loan!</p>
                            <Button onClick={redirect("/loans")} className="w-full bg-white text-blue-700 hover:bg-blue-100 font-semibold text-lg py-3">
                                Apply Now <ChevronRight className="ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                                <CreditCard className="mr-2" />
                                Your Loans
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {loans.map((loan, index) => (
                                <Loan key={index} loan={loan} />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}