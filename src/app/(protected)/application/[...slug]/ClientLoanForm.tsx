"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import dynamic from 'next/dynamic';

const BusinessInformation = dynamic(() => import('./BusinessInformation'));
const Address = dynamic(() => import('./Address'));
const ContactInfo = dynamic(() => import('./ContactInfo'));
const LoanDetails = dynamic(() => import('./LoanDetails'));
const FinancialInformation = dynamic(() => import('./Financial'));
const SupportingDocuments = dynamic(() => import('./SupportingDocuments'));
const Review = dynamic(() => import('./Review'));

const ClientLoanForm = ({ stages, defaultValues, formSchema }) => {
    const [currentStage, setCurrentStage] = useState(0);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const nextStage = () => {
        setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
    };

    const prevStage = () => {
        setCurrentStage((prev) => Math.max(prev - 1, 0));
    };

    const renderStageContent = () => {
        switch (stages[currentStage].id) {
            case 'business':
                return <BusinessInformation form={form} />;
            case 'address':
                return <Address form={form} />;
            case 'contact':
                return <ContactInfo form={form} />;
            case 'loan':
                return <LoanDetails form={form} />;
            case 'financial':
                return <FinancialInformation form={form} />;
            case 'documents':
                return <SupportingDocuments />;
            case 'review':
                return <Review form={form} />;
            default:
                return null;
        }
    };

    return (
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
    );
};

export default ClientLoanForm;