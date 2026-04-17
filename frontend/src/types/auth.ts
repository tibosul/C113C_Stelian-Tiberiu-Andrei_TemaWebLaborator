// Types for authentication and user

// Data sent during login
export interface LoginRequest {
  email_or_username: string;
  password: string;
}

// Data received from backend after login
export interface LoginResponse {
  token: string;
  user: User;
}

// User structure
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  country_code: string;
  tier: string;
  kyc_verified: boolean;
  created_at: string;
  is_admin: boolean;
  cash_balance?: string;
  buying_power?: string;
}

// AuthContext state
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email_or_username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  error: string | null;
}
