"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema, stages } from '@/lib/constants';
import LoanUpload from '@/components/LoanUpload';

const MultiStageLoanApplication = () => {
    const [currentStage, setCurrentStage] = useState(0);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessType: undefined,
            taxId: "",
            yearEstablished: "",
            annualRevenue: 0,
            numberOfEmployees: 0,
            businessAddress: "",
            city: "",
            state: "",
            zipCode: "",
            contactFirstName: "",
            contactLastName: "",
            contactEmail: "",
            contactPhone: "",
            loanAmount: 0,
            loanPurpose: undefined,
            propertyType: undefined,
            propertyUse: undefined,
            creditScore: 300,
            downPayment: 0,
            hasCoBorrower: false,
            additionalComments: "",
            agreeToTerms: false
        },
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

    const nextStage = async () => {
        const currentFields = stages[currentStage].fields;
        const isValid = await form.trigger(currentFields);
        if (isValid) {
            setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
        }
    };

    const prevStage = () => {
        setCurrentStage((prev) => Math.max(prev - 1, 0));
    };

    const renderStageContent = () => {
        const stage = stages[currentStage];
        return (
            <>

                {stage.fields.map((fieldName) => (
                    <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</FormLabel>
                                <FormControl>
                                    {fieldName === 'businessType' ? (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select business type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="llc">LLC</SelectItem>
                                                <SelectItem value="corporation">Corporation</SelectItem>
                                                <SelectItem value="partnership">Partnership</SelectItem>
                                                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : fieldName === 'loanPurpose' ? (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select loan purpose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="purchase">Purchase</SelectItem>
                                                <SelectItem value="refinance">Refinance</SelectItem>
                                                <SelectItem value="expansion">Business Expansion</SelectItem>
                                                <SelectItem value="equipment">Equipment Purchase</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : fieldName === 'propertyType' ? (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                                <SelectItem value="industrial">Industrial</SelectItem>
                                                <SelectItem value="retail">Retail</SelectItem>
                                                <SelectItem value="office">Office</SelectItem>
                                                <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : fieldName === 'propertyUse' ? (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property use" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                                                <SelectItem value="investment">Investment Property</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : fieldName === 'hasCoBorrower' ? (
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    ) : fieldName === 'additionalComments' ? (
                                        <Textarea {...field} />
                                    ) : fieldName === 'agreeToTerms' ? (
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    ) : (
                                        <Input {...field} type={fieldName.includes('Amount') || fieldName === 'annualRevenue' || fieldName === 'numberOfEmployees' || fieldName === 'creditScore' || fieldName === 'downPayment' ? 'number' : 'text'} />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                {stage.id === 'review' && (
                    <div className="space-y-2 mt-4">
                        <h3 className="text-lg font-semibold">Application Summary</h3>
                        {stages.flatMap(s => s.fields).filter(f => f !== 'agreeToTerms').map(fieldName => (
                            <p key={fieldName}>
                                <strong>{fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong>
                                {fieldName === 'hasCoBorrower'
                                    ? (form.getValues(fieldName) ? 'Yes' : 'No')
                                    : form.getValues(fieldName)?.toString() || 'Not provided'}
                            </p>
                        ))}
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="bg-black min-h-screen p-8">
            <h1 className="text-3xl text-white font-bold mb-8 text-center">Business Mortgage Loan Application</h1>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>{stages[currentStage].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {renderStageContent()}
                            <div className="flex justify-between mt-6">
                                <Button type="button" onClick={prevStage} disabled={currentStage === 0}>
                                    Previous
                                </Button>
                                {currentStage < stages.length - 1 ? (
                                    <Button type="button" onClick={nextStage}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                                        Submit Application
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="text-lg font-semibold">Required Documents</h3>
                    <p className="text-sm text-gray-600">Please upload the following documents:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-2">
                        <li>Business Tax Returns (last 3 years)</li>
                        <li>Personal Tax Returns of owners (last 3 years)</li>
                        <li>Financial Statements (Balance Sheet and Income Statement)</li>
                        <li>Business Plan</li>
                        <li>Proof of Business Registration</li>
                    </ul>
                    <LoanUpload />
                </CardContent>
            </Card>
        </div>
    );
};

export default MultiStageLoanApplication;