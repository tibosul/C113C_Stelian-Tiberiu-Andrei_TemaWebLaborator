import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * COMPONENTA PROTECTEDROUTE
 *
 * Ce face:
 * 1. Verifică dacă userul este autentificat
 * 2. Dacă DA -> randează copiii (pagina protejată)
 * 3. Dacă NU -> redirectează către /login
 *
 * Cum se folosește:
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // În timp ce se încarcă, afișăm un spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // Dacă nu este autentificat, redirectăm la login
  // Salvăm location-ul curent ca să putem reveni după login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Dacă este autentificat, randăm pagina protejată
  return <>{children}</>;
}
