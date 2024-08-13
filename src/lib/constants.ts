import { z } from 'zod';

export const formSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(["llc", "corporation", "partnership", "sole-proprietorship"]),
    taxId: z.string().regex(/^\d{2}-\d{7}$/, "Invalid Tax ID format"),
    yearEstablished: z.number().int().min(1800).max(new Date().getFullYear()),
    annualRevenue: z.number().positive("Annual revenue must be positive"),
    numberOfEmployees: z.number().int().min(1, "Number of employees must be at least 1"),
    businessAddress: z.string().min(1, "Business address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().length(2, "State should be a 2-letter code"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
    contactFirstName: z.string().min(1, "Contact first name is required"),
    contactLastName: z.string().min(1, "Contact last name is required"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number format"),
    loanAmount: z.number().positive("Loan amount must be positive"),
    loanPurpose: z.enum(["purchase", "refinance", "expansion", "equipment"]),
    propertyType: z.enum(["commercial", "industrial", "retail", "office", "mixed-use"]),
    propertyUse: z.enum(["owner-occupied", "investment"]),
    creditScore: z.number().int().min(300).max(850),
    downPayment: z.number().min(0, "Down payment cannot be negative"),
    hasCoBorrower: z.boolean(),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
    additionalComments: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;


export const defaultValues = {
    businessName: "",
    businessType: "",
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
    loanPurpose: "purchase",
    propertyType: "commercial",
    propertyUse: "owner-occupied",
    creditScore: 300,
    downPayment: 0,
    hasCoBorrower: false,
    agreeToTerms: false,
    additionalComments: "",
}

export const blurhash = "L44-*2%456X8~Xxv9aoepJS$RPxE"

export type FormValues = z.infer<typeof formSchema>;