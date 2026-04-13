// Tipuri pentru autentificare și user

// Datele pe care le trimitem la login
export interface LoginRequest {
  email_or_username: string;
  password: string;
}

// Datele pe care le primim de la backend dupa login
export interface LoginResponse {
  token: string;
  user: User;
}

// Structura unui user
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  country: string;
}

// Ce ține AuthContext-ul
export interface AuthContextType {
  user: User | null;
  // token: string | null; -- will use later when backend is ready, for now we just check localStorage directly in context
  // isAuthenticated: boolean; -- 
  isLoading: boolean;
  login: (email_or_username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}
