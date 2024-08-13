import React from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const ContactInfo = (form) => {
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
}

export default ContactInfo;