import { z } from 'zod';

export const formSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(["llc", "corporation", "partnership", "sole-proprietorship"]),
    taxId: z.string().min(1, "Tax ID is required"),
    yearEstablished: z.string()
        .min(1, "Year established is required")
        .refine(
            (val) => {
                const year = parseInt(val, 10);
                return !isNaN(year) && year >= 1800 && year <= new Date().getFullYear();
            },
            {
                message: "Year must be between 1800 and current year",
            }
        ),
    annualRevenue: z.string()
        .min(1, "Annual revenue is required")
        .refine(
            (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
            {
                message: "Annual revenue must be a positive number",
            }
        ),
    numberOfEmployees: z.string()
        .min(1, "Number of employees is required")
        .refine(
            (val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
            {
                message: "Number of employees must be a positive integer",
            }
        ),
    businessAddress: z.string().min(1, "Business address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    contactFirstName: z.string().min(1, "First name is required"),
    contactLastName: z.string().min(1, "Last name is required"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().min(1, "Phone number is required"),
    amount: z.string()
        .min(1, "Loan amount is required")
        .refine(
            (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
            {
                message: "Loan amount must be greater than 0",
            }
        ),
    loanPurpose: z.enum(["purchase", "refinance", "expansion", "equipment"]),
    propertyType: z.enum(["commercial", "industrial", "retail", "office", "mixed-use"]),
    propertyUse: z.enum(["owner-occupied", "investment"]),
    creditScore: z.string()
        .min(1, "Credit score is required")
        .refine(
            (val) => {
                const score = parseInt(val, 10);
                return !isNaN(score) && score >= 300 && score <= 850;
            },
            {
                message: "Credit score must be between 300 and 850",
            }
        ),
    downPayment: z.string()
        .min(1, "Down payment is required")
        .refine(
            (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
            {
                message: "Down payment must be a positive number",
            }
        ),
    hasCoBorrower: z.boolean(),
    additionalComments: z.string().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions")
});

export const stages = [
    { id: 'business-info', title: 'Business Information', fields: ['businessName', 'businessType', 'taxId', 'yearEstablished', 'annualRevenue', 'numberOfEmployees'] },
    { id: 'contact-info', title: 'Contact Information', fields: ['businessAddress', 'city', 'state', 'zipCode', 'contactFirstName', 'contactLastName', 'contactEmail', 'contactPhone'] },
    { id: 'loan-details', title: 'Loan Details', fields: ['amount', 'loanPurpose', 'propertyType', 'propertyUse'] },
    { id: 'financial-info', title: 'Financial Information', fields: ['creditScore', 'downPayment', 'hasCoBorrower'] },
    { id: 'review', title: 'Review and Submit', fields: ['additionalComments', 'agreeToTerms'] }
];


export const blurhash = "L44-*2%456X8~Xxv9aoepJS$RPxE"

export type FormValues = z.infer<typeof formSchema>;

export const features = [
    { emoji: '💸', title: "Improved AI ", description: "Approvals up to $50,000 in minutes", content: "" },
    { emoji: '🔒', title: "Secure Process", description: "Bank-level data protection" },
    { emoji: '🕰️', title: "24/7 Access", description: "Apply anytime, anywhere" },
    { emoji: '📱', title: "Mobile-Friendly", description: "Easy application on any device" }
];
