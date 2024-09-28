"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


export const ADialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="bg-gray-40 ">
                <Button>
                    Find Out More!
                </Button></DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-gray-700">
                    <DialogTitle>Our AI Analyzes:</DialogTitle>
                    <DialogDescription>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Business Tax Returns (last 3 years)</li>
                            <li>Personal Tax Returns of owners (last 3 years)</li>
                            <li>Financial Statements (Balance Sheet and Income Statement)</li>
                            <li>Business Plan</li>
                            <li>Proof of Business Registration</li>
                        </ul>
                    </DialogDescription>
                    <DialogTitle> <h3 className="font-semibold text-lg mb-2">The AI-Generated Report Includes:</h3>
                    </DialogTitle>
                    <DialogDescription>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Financial health assessment of the company</li>
                            <li>Cash flow analysis and projections</li>
                            <li>Risk assessment based on industry standards</li>
                            <li>Verification of business legitimacy and registration</li>
                            <li>Evaluation of the business plan feasibility</li>
                            <li>Recommendation for mortgage approval or denial</li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}