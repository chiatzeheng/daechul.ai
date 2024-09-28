import {
    AlertDialog,

    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


export const Dialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-gray-40 ">
                <Button>
                    Find Out More!
                </Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-gray-700">
                    <AlertDialogTitle>Our AI Analyzes:</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Business Tax Returns (last 3 years)</li>
                            <li>Personal Tax Returns of owners (last 3 years)</li>
                            <li>Financial Statements (Balance Sheet and Income Statement)</li>
                            <li>Business Plan</li>
                            <li>Proof of Business Registration</li>
                        </ul>
                    </AlertDialogDescription>
                    <AlertDialogTitle> <h3 className="font-semibold text-lg mb-2">The AI-Generated Report Includes:</h3>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Financial health assessment of the company</li>
                            <li>Cash flow analysis and projections</li>
                            <li>Risk assessment based on industry standards</li>
                            <li>Verification of business legitimacy and registration</li>
                            <li>Evaluation of the business plan feasibility</li>
                            <li>Recommendation for mortgage approval or denial</li>
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}