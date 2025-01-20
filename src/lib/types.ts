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
  

 export interface AIUnderwritingReport {
  loan_decision: string;
  confidence_score: number;
  risk_assessment: {
    overall_risk_level: string;
    financial_health_score: number;
    repayment_capacity_score: number;
    collateral_quality_score: number;
  };
  financial_analysis: {
    revenue_trend: string;
    profitability_analysis: string;
    liquidity_assessment: string;
    debt_structure: string;
  };
  business_evaluation: {
    industry_position: string;
    growth_potential: string;
    management_capability: string;
  };
  loan_purpose_alignment: string;
  property_evaluation: string;
  key_strengths: string[];
  key_concerns: string[];
  mitigating_factors: string[];
  recommended_loan_terms: {
    interest_rate: string;
    loan_term: string;
    collateral_requirements: string;
    special_conditions: string[];
  };
  final_recommendation: string;
};