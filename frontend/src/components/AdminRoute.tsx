import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * AdminRoute - Restricts access to users with administrative privileges.
 * Redirects to dashboard if the user is authenticated but not an admin.
 * Redirects to login if the user is not authenticated.
 */
export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-on-surface-variant font-bold uppercase tracking-[0.2em] animate-pulse">Verifying Administration Access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.is_admin) {
    // If authenticated but not admin, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
