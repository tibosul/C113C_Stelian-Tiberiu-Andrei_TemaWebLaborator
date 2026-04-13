import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PAGINA DASHBOARD
 *
 * Aceasta este o pagină PROTEJATĂ:
 * - Doar userii autentificați pot accesa
 * - Afișează informații despre userul curent
 * - Are buton de logout
 */

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirectăm la login după logout
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header simplu */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Conținut principal */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Card de bun venit */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Bun venit, {user?.first_name} {user?.last_name}!
          </h2>
          <p className="text-slate-400">
            Ai accesat platforma de trading.
          </p>
        </div>

        {/* Informații user */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Informații Cont
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Username:</span>
              <span className="text-white font-mono">{user?.username}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Email:</span>
              <span className="text-white">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Nume:</span>
              <span className="text-white">{user?.first_name} {user?.last_name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Țară:</span>
              <span className="text-white font-semibold">{user?.country}</span>
            </div>
          </div>
        </div>

        {/* Placeholder pentru conținut viitor */}
        <div className="mt-6 bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Funcționalități viitoare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Portofoliu', desc: 'Vezi pozițiile tale' },
              { title: 'Tranzacții', desc: 'Istoric și tranzacții noi' },
              { title: 'Grafice', desc: 'Analiză tehnică' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
