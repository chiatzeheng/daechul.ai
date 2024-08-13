import React from "react";
import { FormControl, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormType } from "@/lib/constants";

const Review = (form) => {

    console.log(form)
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
}

export default Review;