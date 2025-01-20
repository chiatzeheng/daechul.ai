"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/trpc/react';
import { toast } from '@/components/ui/use-toast';
import type { BusinessLoanApplication, AIUnderwritingReport } from '@/lib/types';

const AIUnderwritingReport: React.FC<{ data: BusinessLoanApplication; documents: string[] }> = ({ data, documents }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [reportData, setReportData] = useState<AIUnderwritingReport | null>(null);

    const generateReport = api.loan.generateAIUnderwritingReport.useMutation();
    const { data: loanApplications, isLoading, isError } = api.loan.getLoanApplications.useQuery({ id: data?.loanBridge[0]?.id });
    const submitReport = api.loan.postReport.useMutation();

    useEffect(() => {
        if (loanApplications && loanApplications.length > 0) {

            const application = loanApplications[0]?.application
            if (application) {
                setReportData(application);
                setIsGenerated(true);
            }
        }
    }, [loanApplications]);

    console.log(loanApplications)

    const handleGenerateReport = () => {
        setIsGenerating(true);
        generateReport.mutate(
            { data, documents },
            {
                onSuccess: (generatedData: AIUnderwritingReport) => {
                    setIsGenerating(false);
                    setIsGenerated(true);
                    setReportData(generatedData);

                    toast({
                        description: "AI Underwriting Report Generated Successfully!",
                    });

                    submitReport.mutate(
                        { id: data?.loanBridge[0]?.id, data: generatedData },
                        {
                            onSuccess: () => {
                                toast({
                                    description: "AI Underwriting Report Submitted Successfully!",
                                });
                            },
                            onError: () => {
                                toast({
                                    description: "Error Submitting AI Underwriting Report",
                                    variant: "destructive",
                                });
                            },
                        }
                    );
                },
                onError: () => {
                    toast({
                        description: "Error Generating AI Underwriting Report",
                        variant: "destructive",
                    });
                    setIsGenerating(false);
                    setIsGenerated(false);
                },
            }
        );
    };

    const renderReportData = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <p>Loading loan application data...</p>
                </div>
            );
        }

        if (isError) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Error loading loan application data. Please try again later.
                    </AlertDescription>
                </Alert>
            );
        }

        if (!loanApplications || loanApplications.length === 0) {
            return (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        No loan application data found.
                    </AlertDescription>
                </Alert>
            );
        }



        return (
            <div className="mt-6 space-y-4">
                <div className="space-y-2">
                    {/* <p><strong>Applicant:</strong> {currentApplication?.applicantName}</p>
                    <p><strong>Loan Amount Requested:</strong> ${currentApplication?.loanAmount.toLocaleString()}</p>*/}
                </div>

                {reportData && (
                    <>
                        <h3 className="text-xl font-semibold mt-6">AI Underwriting Report</h3>
                        <div className="space-y-4">
                            <p><strong>Loan Decision:</strong> {reportData.loan_decision}</p>
                            <p><strong>Confidence Score:</strong> {reportData.confidence_score}</p>

                            <div>
                                <h4 className="font-semibold">Risk Assessment</h4>
                                <ul className="list-disc list-inside">
                                    <li>Overall Risk Level: {reportData.risk_assessment.overall_risk_level}</li>
                                    <li>Financial Health Score: {reportData.risk_assessment.financial_health_score}</li>
                                    <li>Repayment Capacity Score: {reportData.risk_assessment.repayment_capacity_score}</li>
                                    <li>Collateral Quality Score: {reportData.risk_assessment.collateral_quality_score}</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold">Financial Analysis</h4>
                                <p>{reportData.financial_analysis.revenue_trend}</p>
                                <p>{reportData.financial_analysis.profitability_analysis}</p>
                                <p>{reportData.financial_analysis.liquidity_assessment}</p>
                                <p>{reportData.financial_analysis.debt_structure}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Business Evaluation</h4>
                                <p><strong>Industry Position:</strong> {reportData.business_evaluation.industry_position}</p>
                                <p><strong>Growth Potential:</strong> {reportData.business_evaluation.growth_potential}</p>
                                <p><strong>Management Capability:</strong> {reportData.business_evaluation.management_capability}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Loan Purpose Alignment</h4>
                                <p>{reportData.loan_purpose_alignment}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Property Evaluation</h4>
                                <p>{reportData.property_evaluation}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Key Strengths</h4>
                                <ul className="list-disc list-inside">
                                    {reportData.key_strengths.map((strength, index) => (
                                        <li key={index}>{strength}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold">Key Concerns</h4>
                                <ul className="list-disc list-inside">
                                    {reportData.key_concerns.map((concern, index) => (
                                        <li key={index}>{concern}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold">Mitigating Factors</h4>
                                <ul className="list-disc list-inside">
                                    {reportData.mitigating_factors.map((factor, index) => (
                                        <li key={index}>{factor}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold">Recommended Loan Terms</h4>
                                <p><strong>Interest Rate:</strong> {reportData.recommended_loan_terms.interest_rate}</p>
                                <p><strong>Loan Term:</strong> {reportData.recommended_loan_terms.loan_term}</p>
                                <p><strong>Collateral Requirements:</strong> {reportData.recommended_loan_terms.collateral_requirements}</p>
                                <h5 className="font-semibold mt-2">Special Conditions:</h5>
                                <ul className="list-disc list-inside">
                                    {reportData.recommended_loan_terms.special_conditions.map((condition, index) => (
                                        <li key={index}>{condition}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold">Final Recommendation</h4>
                                <p>{reportData.final_recommendation}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };
    return (
        <Card className="mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">AI Mortgage Underwriting Report</CardTitle>
                <CardDescription className="text-gray-600">Generate a comprehensive underwriting analysis for commercial mortgage applications</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6 p-6">
                <div className="text-gray-700">
                    <h3 className="font-semibold text-lg mb-2">Our AI Analyzes:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Business Tax Returns (last 3 years)</li>
                        <li>Personal Tax Returns of owners (last 3 years)</li>
                        <li>Financial Statements (Balance Sheet and Income Statement)</li>
                        <li>Business Plan</li>
                        <li>Proof of Business Registration</li>
                    </ul>
                </div>

                <div className="text-gray-700">
                    <h3 className="font-semibold text-lg mb-2">The AI-Generated Report Includes:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Financial health assessment of the company</li>
                        <li>Cash flow analysis and projections</li>
                        <li>Risk assessment based on industry standards</li>
                        <li>Verification of business legitimacy and registration</li>
                        <li>Evaluation of the business plan feasibility</li>
                        <li>Recommendation for mortgage approval or denial</li>
                    </ul>
                </div>


                {!isGenerated ?
                    <>
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                The AI requires a few minutes to analyze all documents and generate a comprehensive report. Please ensure all required documents have been uploaded before proceeding.
                            </AlertDescription>
                        </Alert>

                        <Button
                            onClick={handleGenerateReport}
                            variant="default"
                            className="w-full h-12 bg-black text-white font-semibold text-lg py-3 transition-colors duration-300"
                            disabled={isGenerating || isLoading}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    AI Analyzing Documents...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-5 w-5" />
                                    Generate AI Underwriting Report
                                </>
                            )}
                        </Button>
                    </> : (
                        null
                    )
                }

                {isGenerated && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md text-green-700 flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">AI Underwriting Report Generated Successfully!</p>
                            <p>The report is now available for review below. It includes a detailed analysis of the applicant's financial health, risk assessment, and a recommendation for mortgage approval or denial.</p>
                        </div>
                    </div>
                )}

                {renderReportData()}
            </CardContent>
        </Card>
    );
};

export default AIUnderwritingReport;