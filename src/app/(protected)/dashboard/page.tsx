import React, { Suspense } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoansDisplay from './LoanDisplay';
import { api } from '@/trpc/server'
import { createId } from '@paralleldrive/cuid2';


export default async function Dashboard() {

    const data = await api.loan.getLoanStatuses();

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;




    return (
        <div className="bg-black text-gray-100">
            <main className="mx-auto p-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
                    <Card className="col-span-1 row-span-2 bg-gradient-to-br from-blue-500 to-pink-500 text-white shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                                Apply for new loan
                            </CardTitle>
                            <CardContent className="flex flex-col justify-between h-full">
                                <p>Get quick approval on your next loan!</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/application/${createId()}`} >
                                    <Button className="w-full bg-white text-black font-semibold text-lg py-3">
                                        Apply Now
                                    </Button>
                                </Link>
                            </CardFooter>
                        </CardHeader>

                    </Card>

                    <Card className="col-span-1 row-span-2 bg-white shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl text-black">
                                Your Loans
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="rounded-lg overflow-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-900">
                            <Suspense fallback={<div>Loading...</div>}>
                                <LoansDisplay data={data} />
                            </Suspense>
                        </CardContent>
                    </Card>


                </div>
            </main>
        </div>
    );
}