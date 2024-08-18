import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { api } from '@/trpc/react';
import { toast } from '@/components/ui/use-toast';

const ActionPanel = ({ id }: { id: string }) => {

    const approveLoan = api.loan.updateLoanStatus.useMutation();

    const rejectLoan = api.loan.updateLoanStatus.useMutation()


    const approved = () => {
        approveLoan.mutate({ loanId: id, status: 'APPROVED' }, {
            onSuccess: () => {
                toast({ description: "Loan approved successfully", variant: "default" })
            },
            onError: (err) => {
                console.log(err)
                toast({ description: "Loan approval failed", variant: "destructive" })
            },
        });
    }

    const reject = () => {
        rejectLoan.mutate({ loanId: id, status: 'REJECTED' }, {
            onSuccess: () => {
                toast({ description: "Loan approved successfully", variant: "default" })
            },
            onError: (err) => {
                console.log(err)
                toast({ description: "Loan approval failed", variant: "destructive" })
            },
        });
    }

    console.log(id);
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Loan Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <Button onClick={() => approved()} className="w-full bg-green-500 hover:bg-green-600">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button onClick={() => reject()} className="w-full bg-red-500 hover:bg-red-600">
                    <ThumbsDown className="mr-2 h-4 w-4" /> Reject
                </Button>
                <Button variant="outline" className="w-full">
                    <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
            </CardContent>
        </Card>
    )
}


export default ActionPanel;