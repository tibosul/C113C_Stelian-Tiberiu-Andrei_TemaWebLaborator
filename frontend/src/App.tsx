import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * APP.TSX - Componenta principală cu rute
 *
 * Cum funcționează routing-ul:
 * - <Routes> conține toate rutele aplicației
 * - <Route path="/login" element={<LoginPage />} /> = când URL-ul e /login, randează LoginPage
 * - <Navigate to="/login" replace /> = redirect de la / către /login
 * - <ProtectedRoute> înconjoară paginile care necesită autentificare
 */

function App() {
  return (
    <Routes>
      {/* Rute publice - accesibile fără autentificare */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rute protejate - necesită autentificare */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect de la / către /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rută 404 - orice alt URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
