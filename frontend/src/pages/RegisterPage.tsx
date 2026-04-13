import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateRegisterForm, isValidUsername } from '../utils/validators';
import { countries } from '../types/country';
import { useAuth } from '../contexts/AuthContext';

/**
 * PAGINA DE ÎNREGISTRARE
 */

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    country: 'RO', // Default: Romania
  });

  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * Handler pentru schimbarea câmpurilor
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Curățăm eroarea câmpului când userul începe să scrie
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Validare în timp real pentru username
    if (name === 'username') {
      if (!isValidUsername(value)) {
        setFieldErrors(prev => ({
          ...prev,
          username: 'Username trebuie să aibă 3-30 caractere (litere, cifre, _ sau -)',
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');

    // Validăm formularul complet
    const validation = validateRegisterForm({
      ...formData,
      phone: '',      // Câmp optional pentru acum
    });

    if (!validation.valid) {
      setLocalError(validation.error || '');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg p-8 shadow-xl">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Creează Cont
            </h1>
            <p className="text-slate-400">
              Completează pentru a te înregistra
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Câmp Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  fieldErrors.username ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="john_doe"
              />
              {fieldErrors.username && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.username}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Câmp Prenume */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Prenume
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Ion"
                />
              </div>

              {/* Câmp Nume */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Nume
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Popescu"
                />
              </div>
            </div>

            {/* Câmp Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Țară
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-slate-800">
                      {c.flag} &nbsp; {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Câmp Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="ion@exemplu.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Câmp Parolă */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Parolă
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Câmp Confirmă Parolă */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Confirmă
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Mesaj de eroare general */}
            {localError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {localError}
              </div>
            )}

            {/* Buton submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Se înregistrează...' : 'Înregistrează-te'}
            </button>
          </form>

          {/* Link către login */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Ai deja cont?{' '}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Conectează-te
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
