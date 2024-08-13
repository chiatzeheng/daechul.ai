"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const BusinessInformation = ({ form }) => {
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
                            <Input type="number" placeholder="2000" {...field} />
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
                        <FormLabel>Annual Revenue</FormLabel>
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
}

export default BusinessInformation;