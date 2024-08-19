"use client"
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { api } from '@/trpc/react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ActionPanel = ({ id, userId }: { id: string, userId: string }) => {

    const loan = api.loan.updateLoanStatus.useMutation();

    const handleLoanAction = (action: 'APPROVED' | 'REJECTED') => {

        loan.mutate(
            { loanId: id, status: action, userId: userId },
            {
                onSuccess: () => {
                    toast({
                        title: `Loan ${action.toLowerCase()}`,
                        description: `Loan has been successfully ${action.toLowerCase()}.`,
                        variant: "default"
                    });
                },
                onError: (err) => {
                    console.error(err);
                    toast({
                        title: "Action Failed",
                        description: `Failed to ${action.toLowerCase()} the loan. Please try again.`,
                        variant: "destructive"
                    });
                },
            }
        );
    };


    const ActionButton = ({ action, color, icon: Icon }: { action: 'APPROVED' | 'REJECTED', color: string, icon: React.ElementType }) => (
        <Button
            onClick={() => handleLoanAction(action)}
            disabled={loan.status === 'pending'}
            className={cn(
                "w-full transition-all duration-200 ease-in-out",
                color,
                loan.status === 'pending' && "opacity-50 cursor-not-allowed"
            )}
        >
            {loan.status === 'pending' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icon className="mr-2 h-4 w-4" />
            )}
            {action === 'APPROVED' ? 'Approve' : 'Reject'}
        </Button>
    );

    return (
        <Card className="h-full mt-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-700">Loan Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-6">
                <ActionButton
                    action="APPROVED"
                    color="bg-green-500 hover:bg-green-400 text-white"
                    icon={ThumbsUp}
                />
                <ActionButton
                    action="REJECTED"
                    color="bg-red-500 hover:bg-red-400 text-white"
                    icon={ThumbsDown}
                />

            </CardContent>
        </Card>
    );
};

export default ActionPanel;