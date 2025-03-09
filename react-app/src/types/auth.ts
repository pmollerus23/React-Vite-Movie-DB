// src/types/auth.ts
export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ProfileFormData {
  FirstName: string;
  PrefName?: string;
  LastName: string;
  PhoneNumber?: string;
}