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
  
  export type LoanData = {
    id: string;
    userId: string;
    loanId: string;
    status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
    createdAt: Date;
    updatedAt: Date;
    loan: {
      id: string;
      businessName: string;
      amount: number;
    };
  };
  
  export type LoansDisplayProps = {
    data: LoanData[];
  };

  export interface LoanProps {
    loan: {
      id: string;
      name: string;
      amount: number;
      progress: number;
      status: string;
      date: string;
      duration: number;
      interest: number;
    };
  }
  
  export interface PendingLoanProps {
    loan: {
      id: string;
      name: string;
      amount: number;
      date: string;
    };
  }
  
  export interface RejectedLoanProps {
    loan: {
      id: string;
      name: string;
      amount: number;
      date: string;
    };
  }
  