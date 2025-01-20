// src/types/auth.ts
export interface User {
  name: string;
  email: string;
  password: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
