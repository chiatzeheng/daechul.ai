"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

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

export default function LoanCardComponent({ loan }: LoanProps) {
    const getStatusEmoji = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return '🟢';
            case 'pending': return '🟡';
            case 'completed': return '✅';
            default: return '❓';
        }
    };

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
                    <p>{getStatusEmoji(loan.status)} Status: {loan.status}</p>
                    <p>📅 Date: {loan.date}</p>
                    <p>⏳ Duration: {loan.duration} months</p>
                    <p>💹 Interest: {loan.interest}%</p>
                </div>
            </CardContent>
        </Card>
    );
}