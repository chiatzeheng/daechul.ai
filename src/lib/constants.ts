import { z } from 'zod';

export const formSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(["llc", "corporation", "partnership", "sole-proprietorship"]),
    taxId: z.string().min(1, "Tax ID is required"),
    yearEstablished: z.string().min(1, "Year established is required"),
    annualRevenue: z.string().min(0, "Annual revenue must be a positive number"),
    numberOfEmployees: z.string().min(1, "Number of employees must be at least 1"),
    businessAddress: z.string().min(1, "Business address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    contactFirstName: z.string().min(1, "First name is required"),
    contactLastName: z.string().min(1, "Last name is required"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().min(1, "Phone number is required"),
    loanAmount: z.string().min(1, "Loan amount must be greater than 0"),
    loanPurpose: z.enum(["purchase", "refinance", "expansion", "equipment"]),
    propertyType: z.enum(["commercial", "industria-l", "retail", "office", "mixed-use"]),
    propertyUse: z.enum(["owner-occupied", "investment"]),
    creditScore: z.number().int().min(300).max(850, "Credit score must be between 300 and 850"),
    downPayment: z.string().min(0, "Down payment must be a positive number"),
    hasCoBorrower: z.boolean(),
    additionalComments: z.string().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions")
});

export const stages = [
    {
        id: 'business',
        title: 'Business Information',
        fields: ['businessName', 'businessType', 'taxId', 'yearEstablished', 'annualRevenue', 'numberOfEmployees']
    },
    {
        id: 'address',
        title: 'Business Address',
        fields: ['businessAddress', 'city', 'state', 'zipCode']
    },
    {
        id: 'contact',
        title: 'Contact Information',
        fields: ['contactFirstName', 'contactLastName', 'contactEmail', 'contactPhone']
    },
    {
        id: 'loan',
        title: 'Loan Details',
        fields: ['loanAmount', 'loanPurpose', 'propertyType', 'propertyUse']
    },
    {
        id: 'financial',
        title: 'Financial Information',
        fields: ['creditScore', 'downPayment', 'hasCoBorrower', 'additionalComments']
    },
    { 
        id: 'documents', 
        title: 'Document Upload', 
        fields: [] 
      },
    {
        id: 'review',
        title: 'Review and Submit',
        fields: ['agreeToTerms']
    },
];


export const blurhash = "L44-*2%456X8~Xxv9aoepJS$RPxE"

export type FormValues = z.infer<typeof formSchema>;

export const features = [
    { emoji: '💸', title: "Improved AI ", description: "Approvals up to $50,000 in minutes", content: "" },
    { emoji: '🔒', title: "Secure Process", description: "Bank-level data protection" },
    { emoji: '🕰️', title: "24/7 Access", description: "Apply anytime, anywhere" },
    { emoji: '📱', title: "Mobile-Friendly", description: "Easy application on any device" }
];
