"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Calendar, ArrowRight, Building, User } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import type { LoanProps, PendingLoanProps, RejectedLoanProps, LoansDisplayProps } from '@/lib/types'

export function ApprovedLoan({ loan }: LoanProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{loan.name}</h3>
              <p className="text-sm text-gray-600">Business Loan</p>
            </div>
          </div>
          <StatusBadge status="approved" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">${loan.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{loan.date}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{loan.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loan.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {loan.duration} months • {loan.interest}% APR
          </div>
          <Link href={`/loans/${loan.id}`}>
            <Button variant="ghost" size="sm" className="group-hover:bg-gray-100">
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function PendingLoan({ loan }: PendingLoanProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{loan.name}</h3>
              <p className="text-sm text-gray-600">Under Review</p>
            </div>
          </div>
          <StatusBadge status="pending" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">${loan.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{loan.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full">
            Awaiting Review
          </div>
          <Link href={`/loans/${loan.id}`}>
            <Button variant="ghost" size="sm" className="group-hover:bg-gray-100">
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function RejectedLoan({ loan }: RejectedLoanProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <User className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{loan.name}</h3>
              <p className="text-sm text-gray-600">Application Declined</p>
            </div>
          </div>
          <StatusBadge status="rejected" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">${loan.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{loan.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full">
            Review Required
          </div>
          <Link href={`/loans/${loan.id}`}>
            <Button variant="ghost" size="sm" className="group-hover:bg-gray-100">
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export const LoansDisplay = ({ data }: LoansDisplayProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<Building className="h-12 w-12" />}
        title="No loan applications yet"
        description="Start your first loan application to see it here"
        action={{
          label: "Apply for Loan",
          onClick: () => window.location.href = `/application/${Date.now()}`
        }}
      />
    )
  }

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
        }

        switch (loanData.status) {
          case 'APPROVED':
            return (
              <ApprovedLoan
                key={loanData.id}
                loan={{
                  ...commonProps.loan,
                  progress: 75, // You might want to calculate this based on some criteria
                  status: 'Approved',
                  duration: 12, // You might want to store this in your data or calculate it
                  interest: 5.5, // You might want to store this in your data or calculate it
                }}
              />
            )
          case 'PENDING':
          case 'UNDER_REVIEW':
            return <PendingLoan key={loanData.id} loan={commonProps.loan} />
          case 'REJECTED':
            return <RejectedLoan key={loanData.id} loan={commonProps.loan} />
          default:
            return null
        }
      })}
    </div>
  )
}

export default LoansDisplay