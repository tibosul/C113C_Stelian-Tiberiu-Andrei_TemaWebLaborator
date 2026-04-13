import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateLoginForm } from "../utils/validators";

/**
 * PAGINA DE LOGIN
 *
 * Acceptă login cu email SAU username.
 * Validarea se face în funcție de formatul inputului:
 * - Dacă conține '@' → se validează ca email
 * - Dacă nu conține '@' → se validează ca username
 */

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [validationError, setValidationError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    if (validationError) setValidationError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setValidationError("");

    const validation = validateLoginForm(identifier, password);
    if (!validation.valid) {
      setValidationError(validation.error || "");
      return;
    }

    setIsLoading(true);
    try {
      // MOCK LOGIN FOR FRONTEND TESTING
      console.log('Mock login with:', { identifier, password });
      
      const mockUser = {
        id: '1',
        email: identifier.includes('@') ? identifier : 'mock@example.com',
        username: identifier.includes('@') ? 'mockuser' : identifier,
        first_name: 'Mock',
        last_name: 'User',
        phone: '',
        country: 'RO'
      };

      localStorage.setItem('auth_token', 'mock_token_123');
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      // Update context state manually since we are bypassing the real login function
      window.location.reload(); // Quick way to refresh context from localStorage
      
      // navigate("/dashboard"); // This might be redundant if reload is used
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const looksLikeEmail = identifier.includes("@");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg p-8 shadow-xl">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Trading App</h1>
            <p className="text-slate-400">
              Conectează-te cu email-ul sau username-ul
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email sau Username
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={handleIdentifierChange}
                required
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  validationError ? "border-red-500" : "border-slate-600"
                }`}
                placeholder={looksLikeEmail ? "email@exemplu.com" : "username"}
              />
              {validationError && (
                <p className="text-red-400 text-sm mt-1">{validationError}</p>
              )}
              <p className="text-slate-500 text-xs mt-1">
                {looksLikeEmail
                  ? "Se va valida ca email"
                  : "Se va valida ca username (3-30 caractere)"}
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Parolă
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {localError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {localError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Se conectează..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Nu ai cont?{" "}
              <Link
                to="/register"
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Înregistrează-te
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
