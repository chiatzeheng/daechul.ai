"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, X } from 'lucide-react';


interface LoanProps {
    loan: {
        name: string;
        amount: number;
        progress: number;
        status: string;
        date: string;
        duration: number;
        interest: number;
    };
}

interface PendingLoanProps {
    loan: {
        name: string;
        amount: number;
        date: string;
    };
}


interface RejectedLoanProps {
    loan: {
        name: string;
        amount: number;
        date: string;
        reason: string;
    };
}

export function ApprovedLoan({ loan }: LoanProps) {

    return (
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow mb-4">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-black">💼 {loan.name}</h3>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-black">
                        💰 ${loan.amount.toLocaleString()}
                    </span>
                </div>
                <div className="space-y-2 text-black">
                    <p>📊 Progress: {loan.progress}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-black h-2.5 rounded-full"
                            style={{ width: `${loan.progress}%` }}
                        ></div>
                    </div>
                    <p>📅 Date: {loan.date}</p>
                    <p>⏳ Duration: {loan.duration} months</p>
                    <p>💹 Interest: {loan.interest}%</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function PendingLoan({ loan }: PendingLoanProps) {
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





export function RejectedLoan({ loan }: RejectedLoanProps) {
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