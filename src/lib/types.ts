export type LoanBridge = {
    id: string;
    userId: string;
    loanId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
 export type BusinessLoanApplication = {
    id: string;
    userId: string;
    businessName: string;
    businessType: string;
    taxId: string;
    yearEstablished: number;
    annualRevenue: number;
    numberOfEmployees: number;
    businessAddress: string;
    city: string;
    state: string;
    zipCode: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    amount: number;
    loanPurpose: string;
    propertyType: string;
    propertyUse: string;
    creditScore: number;
    downPayment: number;
    hasCoBorrower: boolean;
    createdAt: Date;
    updatedAt: Date;
    loanBridge: LoanBridge[];
  };
  