"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const LoanDetails = ({ form }) => {
    return (
        <>
            <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Desired Loan Amount</FormLabel>
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
}


export default LoanDetails;