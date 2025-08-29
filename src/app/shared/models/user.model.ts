export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  roles: string;
  details: UserDetails;
  createdAt: string;
}

export interface UserDetails {
  EDPNo: string;
  Name: string;
  AddressOffice: string;
  AddressResidential: string;
  Designation: string;
  PhoneOffice: string;
  PhoneResidential: string;
  Mobile: string;
  Email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  phone: string;
  roles: string;
  details: UserDetails;
  expiresAt: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  phone?: string;
  EDPNo?: string;
  Name?: string;
  AddressOffice?: string;
  AddressResidential?: string;
  Designation?: string;
  PhoneOffice?: string;
  PhoneResidential?: string;
  Mobile?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}