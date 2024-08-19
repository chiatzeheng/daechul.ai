"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LoanUpload from '@/components/LoanUpload';
import { api } from '@/trpc/react';
import { formSchema, stages, } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

const MultiStageLoanApplication = () => {
    const [currentStage, setCurrentStage] = useState(0);

    const uploadDocument = api.loan.submitLoanApplication.useMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessType: "llc",
            taxId: "",
            yearEstablished: "",
            annualRevenue: "",
            numberOfEmployees: "",
            businessAddress: "",
            city: "",
            state: "",
            zipCode: "",
            contactFirstName: "",
            contactLastName: "",
            contactEmail: "",
            contactPhone: "",
            amount: "",
            loanPurpose: "purchase",
            propertyType: "commercial",
            propertyUse: "owner-occupied",
            creditScore: "",
            downPayment: "",
            hasCoBorrower: false,
            additionalComments: "",
            agreeToTerms: false
        },
        mode: 'onChange',
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const convertedData = {
            ...data,
            yearEstablished: parseInt(data.yearEstablished, 10),
            annualRevenue: parseFloat(data.annualRevenue),
            numberOfEmployees: parseInt(data.numberOfEmployees, 10),
            amount: parseFloat(data.amount),
            creditScore: parseInt(data.creditScore, 10),
            downPayment: parseFloat(data.downPayment)
        };
        uploadDocument.mutate(convertedData, {
            onSuccess: () => {
                toast({
                    description: "Loan application submitted successfully!",
                })
            },
            onError: () => {
                toast({
                    description: "Error submitting loan application",
                    variant: "destructive"
                })
            },
        })
    };

    const nextStage = async () => {
        const currentFields = stages[currentStage].fields;
        const isValid = await form.trigger(currentFields as Array<keyof z.infer<typeof formSchema>>);
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
                        name={fieldName as keyof z.infer<typeof formSchema>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</FormLabel>
                                <FormControl>
                                    {fieldName === 'businessType' ? (
                                        <Select onValueChange={field.onChange} value={field.value as string}>
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
                                        <Select onValueChange={field.onChange} value={field.value as string}>
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
                                        <Select onValueChange={field.onChange} value={field.value as string}>
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
                                        <Select onValueChange={field.onChange} value={field.value as string}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property use" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                                                <SelectItem value="investment">Investment Property</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : fieldName === 'hasCoBorrower' || fieldName === 'agreeToTerms' ? (
                                        <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                                    ) : fieldName === 'additionalComments' ? (
                                        <Textarea {...field} />
                                    ) : fieldName === 'yearEstablished' || fieldName === 'annualRevenue' || fieldName === 'numberOfEmployees' || fieldName === 'amount' || fieldName === 'creditScore' || fieldName === 'downPayment' ? (
                                        <Input
                                            {...field}
                                            type="number"
                                            min={fieldName === 'yearEstablished' ? 1800 : fieldName === 'creditScore' ? 300 : 0}
                                            max={fieldName === 'yearEstablished' ? new Date().getFullYear() : fieldName === 'creditScore' ? 850 : undefined}
                                            step={fieldName === 'annualRevenue' || fieldName === 'amount' || fieldName === 'downPayment' ? '0.01' : '1'}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value === "" ? "" : value);
                                            }}
                                        />
                                    ) : (
                                        <Input {...field} type="text" />
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
                        {Object.entries(form.getValues()).map(([fieldName, value]) => (
                            <p key={fieldName}>
                                <strong>{fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong>
                                {fieldName === 'hasCoBorrower' || fieldName === 'agreeToTerms'
                                    ? (value ? 'Yes' : 'No')
                                    : value?.toString() || 'Not provided'}
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