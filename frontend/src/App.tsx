import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

/**
 * APP.TSX - Componenta principală cu rute
 *
 * Cum funcționează routing-ul:
 * - <Routes> conține toate rutele aplicației
 * - <Route path="/login" element={<LoginPage />} /> = când URL-ul e /login, randează LoginPage
 * - <Navigate to="/login" replace /> = redirect de la / către /login
 * - <ProtectedRoute> înconjoară paginile care necesită autentificare
 */

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rute publice - accesibile fără autentificare */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

      {/* Rute protejate - necesită autentificare */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Rută 404 - orice alt URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

