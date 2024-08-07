"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from 'lucide-react';

interface PendingLoanProps {
    loan: {
        name: string;
        amount: number;
        date: string;
    };
}

export default function PendingLoan({ loan }: PendingLoanProps) {
    return (
        <Card className="bg-yellow-50 border border-yellow-200 shadow-md mb-4 ">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-yellow-800">⏳ {loan.name}</h3>
                    <span className="text-sm bg-yellow-100 px-2 py-1 rounded-full text-yellow-800">
                        💰 ${loan.amount.toLocaleString()}
                    </span>
                </div>
                <div className="space-y-2 text-yellow-800">
                    <p className="flex items-center">
                        <Clock className="mr-2" size={16} />
                        Application Date: {loan.date}
                    </p>
                    <p className="text-yellow-600 font-medium">Status: Pending Review</p>
                </div>
            </CardContent>
        </Card>
    );
}