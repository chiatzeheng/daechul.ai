import React from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";


const FinancialInformation = (form) => {
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
                        <FormLabel>Down Payment Amount</FormLabel>
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
}

export default FinancialInformation;