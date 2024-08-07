"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';

interface RejectedLoanProps {
    loan: {
        name: string;
        amount: number;
        date: string;
        reason: string;
    };
}

export default function RejectedLoan({ loan }: RejectedLoanProps) {
    return (
        <Card className="bg-red-50 border border-red-200 shadow-md mb-4">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-red-800">❌ {loan.name}</h3>
                    <span className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-800">
                        💰 ${loan.amount.toLocaleString()}
                    </span>
                </div>
                <div className="space-y-2 text-red-800">
                    <p className="flex items-center">
                        <X className="mr-2" size={16} />
                        Rejection Date: {loan.date}
                    </p>
                    <p className="text-red-600 font-medium">Reason: {loan.reason}</p>
                </div>
            </CardContent>
        </Card>
    );
}