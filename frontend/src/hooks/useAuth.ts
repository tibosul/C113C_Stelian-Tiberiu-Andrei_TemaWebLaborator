import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { User, LoginResponse } from '../types/auth';

/**
 * Custom Hook pentru Autentificare
 *
 * Diferența față de AuthContext:
 * - AuthContext ține STATE-ul (user, token, isAuthenticated)
 * - Acest hook ține LOGICA de interacțiune cu API-ul
 *
 * În proiecte mari, separăm așa:
 * - Context = "ce știm" (state)
 * - Hook = "ce facem" (acțiuni)
 *
 * În proiecte mici, poți ține totul în Context (cum am făcut noi)
 */

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export function useAuthLogic(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(() => {
    // Lazy initialization - citim din localStorage la start
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Login cu email și parolă
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      // Salvăm state-ul
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  /**
   * Logout - șterge sesiunea
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/login', { replace: true });
  }, [navigate]);

  /**
   * Înregistrare user nou
   */
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.post<LoginResponse>('/auth/register', {
        name,
        email,
        password,
      });

      // După register, facem automat login
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
  };
}
