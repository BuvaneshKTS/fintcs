export interface Society {
  id: number;
  societyName: string;
  address: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  registrationNumber: string;
  tabs: SocietyTabs;
  isPendingApproval: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocietyTabs {
  Interest: InterestRates;
  Limit: Limits;
}

export interface InterestRates {
  Dividend: number;
  OD: number;
  CD: number;
  Loan: number;
  EmergencyLoan: number;
  LAS: number;
}

export interface Limits {
  Share: number;
  Loan: number;
  EmergencyLoan: number;
}

export interface SocietyUpdateRequest {
  societyName: string;
  address: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  registrationNumber: string;
  tabs: SocietyTabs;
}