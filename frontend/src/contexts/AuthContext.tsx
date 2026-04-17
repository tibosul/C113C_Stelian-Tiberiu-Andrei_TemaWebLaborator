import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types/auth';
import { api } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data on app mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (err: any) {
        console.error('Failed to authenticate:', err.response?.data?.error || err.message);
        logout(); // Force clean up if token is invalid
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email_or_username: string, password: string) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', { email_or_username, password });
      const { token: receivedToken, user: receivedUser } = response.data;
      
      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('auth_token', receivedToken);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Login failed';
      setError(msg);
      throw new Error(msg);
    }
  };

  const register = async (userData: any) => {
    setError(null);
    try {
      // transform payload mapping and include new phone/tier fields
      const payload = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.first_name,
        lastName: userData.last_name,
        country_code: userData.country,
        phone: `${userData.phone_country_code}${userData.phone}`,
        tier: userData.tier
      };
      const response = await api.post('/auth/register', payload);
      const { token: receivedToken, user: receivedUser } = response.data;
      
      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('auth_token', receivedToken);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the context easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
