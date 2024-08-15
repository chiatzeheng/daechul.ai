"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import LoanUpload from '@/components/LoanUpload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema, values } from '@/lib/constants';

const stages = [
    { id: 'business', title: 'Business Information' },
    { id: 'address', title: 'Business Address' },
    { id: 'contact', title: 'Contact Information' },
    { id: 'loan', title: 'Loan Details' },
    { id: 'financial', title: 'Financial Information' },
    { id: 'documents', title: 'Document Upload' },
    { id: 'review', title: 'Review and Submit' },
];

const MultiStageLoanApplication = () => {
    const [currentStage, setCurrentStage] = useState(0);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values,
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    React.useEffect(() => {
        form.reset(values);
    }, []);

    const nextStage = async () => {
        const currentFields = Object.keys(renderStageContent().props);
        const isValid = await form.trigger(currentFields);
        if (isValid) {
            form.reset(values);
            setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
        }
    };

    const prevStage = () => {
        form.reset(values);
        setCurrentStage((prev) => Math.max(prev - 1, 0));
    };

    const renderStageContent = () => {
        switch (stages[currentStage].id) {
            case 'business':
                return (
                    <>
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ABC Corporation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select business type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="llc">LLC</SelectItem>
                                            <SelectItem value="corporation">Corporation</SelectItem>
                                            <SelectItem value="partnership">Partnership</SelectItem>
                                            <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taxId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax ID / EIN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12-3456789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearEstablished"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year Established</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"2000"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="annualRevenue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Annual Revenue ( USD )</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1000000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfEmployees"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Employees</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="50" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 'address':
                return (
                    <>
                        <FormField
                            control={form.control}
                            name="businessAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Business St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Anytown" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 'contact':
                return (
                    <>
                        <FormField
                            control={form.control}
                            name="contactFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactLastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john.doe@business.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="(123) 456-7890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 'loan':
                return (
                    <>
                        <FormField
                            control={form.control}
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desired Loan Amount ( USD )</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1000000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="loanPurpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Purpose</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select loan purpose" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="purchase">Purchase</SelectItem>
                                            <SelectItem value="refinance">Refinance</SelectItem>
                                            <SelectItem value="expansion">Business Expansion</SelectItem>
                                            <SelectItem value="equipment">Equipment Purchase</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                            <SelectItem value="industrial">Industrial</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                            <SelectItem value="office">Office</SelectItem>
                                            <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyUse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Use</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property use" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                                            <SelectItem value="investment">Investment Property</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 'financial':
                return (
                    <>
                        <FormField
                            control={form.control}
                            name="creditScore"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated Business Credit Score</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="300" max="850" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="downPayment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Down Payment Amount ( USD )</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="200000" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hasCoBorrower"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="leading-none">
                                        <FormLabel>
                                            Does this application involve a co-borrower or guarantor?
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="additionalComments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Comments</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any additional information about your business or loan request..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 'documents':
                return (
                    <>
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
                    </>
                );
            case 'review':
                return (
                    <>
                        <h3 className="text-lg font-semibold">Review Your Application</h3>
                        <p className="text-sm text-gray-600 mb-4">Please review your application details before submitting:</p>
                        <div className="space-y-2">
                            <p><strong>Business Name:</strong> {form.getValues("businessName")}</p>
                            <p><strong>Business Type:</strong> {form.getValues("businessType")}</p>
                            <p><strong>Tax ID:</strong> {form.getValues("taxId")}</p>
                            <p><strong>Year Established:</strong> {form.getValues("yearEstablished")}</p>
                            <p><strong>Annual Revenue:</strong> ${form.getValues("annualRevenue")}</p>
                            <p><strong>Number of Employees:</strong> {form.getValues("numberOfEmployees")}</p>
                            <p><strong>Business Address:</strong> {form.getValues("businessAddress")}, {form.getValues("city")}, {form.getValues("state")} {form.getValues("zipCode")}</p>
                            <p><strong>Contact:</strong> {form.getValues("contactFirstName")} {form.getValues("contactLastName")}</p>
                            <p><strong>Contact Email:</strong> {form.getValues("contactEmail")}</p>
                            <p><strong>Contact Phone:</strong> {form.getValues("contactPhone")}</p>
                            <p><strong>Loan Amount:</strong> ${form.getValues("loanAmount")}</p>
                            <p><strong>Loan Purpose:</strong> {form.getValues("loanPurpose")}</p>
                            <p><strong>Property Type:</strong> {form.getValues("propertyType")}</p>
                            <p><strong>Property Use:</strong> {form.getValues("propertyUse")}</p>
                            <p><strong>Credit Score:</strong> {form.getValues("creditScore")}</p>
                            <p><strong>Down Payment:</strong> ${form.getValues("downPayment")}</p>
                            <p><strong>Co-Borrower:</strong> {form.getValues("hasCoBorrower") ? "Yes" : "No"}</p>
                        </div>
                        <FormField
                            control={form.control}
                            name="agreeToTerms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="leading-none">
                                        <FormLabel>
                                            I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a> and authorize the lender to obtain credit reports and verify the information provided in this application.
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-black p-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Business Mortgage Loan Application</h1>
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>{stages[currentStage].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {currentStage === stages.findIndex(stage => stage.id === stages[currentStage].id) && renderStageContent()}
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
        </div>
    );
};

export default MultiStageLoanApplication;