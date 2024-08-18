"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, X } from 'lucide-react';
import Link from 'next/link';

interface LoanProps {
  loan: {
    id: string;
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
    id: string;
    name: string;
    amount: number;
    date: string;
  };
}

interface RejectedLoanProps {
  loan: {
    id: string;
    name: string;
    amount: number;
    date: string;
  };
}

export function ApprovedLoan({ loan }: LoanProps) {
  return (
    <Link href={`/loans/${loan.id}`}>
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
    </Link>
  );
}

export function PendingLoan({ loan }: PendingLoanProps) {
  return (
    <Link href={`/loans/${loan.id}`}>
      <Card className="bg-yellow-50 border border-yellow-200 shadow-md mb-4 hover:shadow-lg transition-shadow">
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
    </Link>
  );
}

export function RejectedLoan({ loan }: RejectedLoanProps) {
  return (
    <Link href={`/loans/${loan.id}`}>
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
            <p className="text-red-600 font-medium">Reason: Not Valid</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// New LoanList component
type LoanData = {
  id: string;
  userId: string;
  loanId: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
  loan: {
    id: string;
    businessName: string;
    amount: number;
  };
};

type LoansDisplayProps = {
  data: LoanData[];
};

export const LoansDisplay: React.FC<LoansDisplayProps> = ({ data }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (

    <div className="space-y-4">
      {data.map((loanData) => {
        const commonProps = {
          loan: {
            id: loanData.loan.id,
            name: loanData.loan.businessName,
            amount: loanData.loan.amount,
            date: formatDate(loanData.createdAt),
          },
        };

        switch (loanData.status) {
          case 'APPROVED':
            return (
              <ApprovedLoan
                key={loanData.id}
                loan={{
                  ...commonProps.loan,
                  progress: 0, // You might want to calculate this based on some criteria
                  status: 'Approved',
                  duration: 12, // You might want to store this in your data or calculate it
                  interest: 5, // You might want to store this in your data or calculate it
                }}
              />
            );
          case 'PENDING':
          case 'UNDER_REVIEW':
            return <PendingLoan key={loanData.id} loan={commonProps.loan} />;
          case 'REJECTED':
            return <RejectedLoan key={loanData.id} loan={commonProps.loan} />;
          default:
            return null; // Handle unexpected status
        }
      })}
    </div>
  );
};

export default LoansDisplay;