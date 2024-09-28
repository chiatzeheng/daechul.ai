"use client"
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { BusinessLoanApplication } from '@/lib/types';
import { Dialog } from './Dialog';
import Link from 'next/link';
import { uuid } from 'uuidv4';

const AIUnderwritingReport = ({ data, documents }: { data: BusinessLoanApplication, documents: string[] }) => {
    // const [isGenerating, setIsGenerating] = useState(false);
    // const [isGenerated, setIsGenerated] = useState(false);
    // const [reportData, setReportData] = useState(null);

    // const generateReport = api.loan.generateAIUnderwritingReport.useMutation();

    // function handleGenerateReport() {
    //     setIsGenerating(true);
    //     generateReport.mutate({ data, documents }, {
    //         onSuccess: (generatedData) => {
    //             setIsGenerating(false);
    //             setIsGenerated(true);
    //             setReportData(generatedData);
    //             toast({
    //                 description: "AI Underwriting Report Generated Successfully!",
    //             })
    //         },
    //         onError: () => {
    //             toast({
    //                 description: "Error Generating AI Underwriting Report",
    //                 variant: "destructive"
    //             })
    //             setIsGenerating(false);
    //             setIsGenerated(false);
    //         }
    //     })
    // }

    // const renderReportData = () => {
    //     if (!reportData) return null;

    //     return (
    //         <div className="mt-6 space-y-4">
    //             <h3 className="text-xl font-semibold">AI Underwriting Report</h3>
    //             <div className="space-y-2">
    //                 <p><strong>Loan Decision:</strong> {reportData.loan_decision}</p>
    //                 <p><strong>Confidence Score:</strong> {reportData.confidence_score}</p>
    //                 <div>
    //                     <h4 className="font-semibold">Risk Assessment</h4>
    //                     <ul className="list-disc list-inside">
    //                         <li>Overall Risk Level: {reportData.risk_assessment.overall_risk_level}</li>
    //                         <li>Financial Health Score: {reportData.risk_assessment.financial_health_score}</li>
    //                         <li>Repayment Capacity Score: {reportData.risk_assessment.repayment_capacity_score}</li>
    //                         <li>Collateral Quality Score: {reportData.risk_assessment.collateral_quality_score}</li>
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h4 className="font-semibold">Financial Analysis</h4>
    //                     <p>{reportData.financial_analysis.revenue_trend}</p>
    //                     <p>{reportData.financial_analysis.profitability_analysis}</p>
    //                     <p>{reportData.financial_analysis.liquidity_assessment}</p>
    //                     <p>{reportData.financial_analysis.debt_structure}</p>
    //                 </div>
    //                 <div>
    //                     <h4 className="font-semibold">Key Strengths</h4>
    //                     <ul className="list-disc list-inside">
    //                         {reportData.key_strengths.map((strength, index) => (
    //                             <li key={index}>{strength}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h4 className="font-semibold">Key Concerns</h4>
    //                     <ul className="list-disc list-inside">
    //                         {reportData.key_concerns.map((concern, index) => (
    //                             <li key={index}>{concern}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h4 className="font-semibold">Recommended Loan Terms</h4>
    //                     <p><strong>Interest Rate:</strong> {reportData.recommended_loan_terms.interest_rate}%</p>
    //                     <p><strong>Loan Term:</strong> {reportData.recommended_loan_terms.loan_term}</p>
    //                     <p><strong>Collateral Requirements:</strong> {reportData.recommended_loan_terms.collateral_requirements}</p>
    //                     <h5 className="font-semibold mt-2">Special Conditions:</h5>
    //                     <ul className="list-disc list-inside">
    //                         {reportData.recommended_loan_terms.special_conditions.map((condition, index) => (
    //                             <li key={index}>{condition}</li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //                 <div>
    //                     <h4 className="font-semibold">Final Recommendation</h4>
    //                     <p>{reportData.final_recommendation}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <Card className="mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader >
                <div className='flex flex-row justify-between'>
                    <CardTitle className="text-2xl font-semibold text-gray-800">AI Mortgage Underwriting Report</CardTitle>

                    <Dialog />
                </div>
                <CardDescription className="text-gray-600">Generate a comprehensive underwriting analysis for commercial mortgage applications</CardDescription>


            </CardHeader>
            <CardContent className="flex flex-col space-y-6 p-6">

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        The AI requires a few minutes to analyze all documents and generate a comprehensive report. Please ensure all required documents have been uploaded before proceeding.
                    </AlertDescription>
                </Alert>


                <Button className="w-full h-12 bg-black text-white font-semibold text-lg py-3 transition-colors duration-300">
                    <Link href={`/report/${uuid()}`}>
                        Generate AI Underwriting Report
                    </Link>
                </Button>

                {/* <Button
                    onClick={handleGenerateReport}
                    variant="default"
                    className="w-full h-12 bg-black text-white font-semibold text-lg py-3 transition-colors duration-300"
                    disabled={isGenerating}
                >
                    <FileText className="mr-2 h-5 w-5" />
                    {isGenerating ? 'AI Analyzing Documents...' : 'Generate AI Underwriting Report'}
                </Button> */}
                {/* 
                {isGenerated && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md text-green-700 flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">AI Underwriting Report Generated Successfully!</p>
                            <p>The report is now available for review below. It includes a detailed analysis of the applicant's financial health, risk assessment, and a recommendation for mortgage approval or denial.</p>
                        </div>
                    </div>
                )}

                {renderReportData()} */}
            </CardContent>
        </Card>
    )
}

export default AIUnderwritingReport;