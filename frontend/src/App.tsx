import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from './pages/PortfolioPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LearningPage from './pages/LearningPage';
import MarketsPage from './pages/MarketsPage';
import AssetDetailPage from './pages/AssetDetailPage';
import AdminPage from './pages/AdminPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './contexts/AuthContext';

/**
 * APP.TSX - Main component with routes
 *
 * How routing works:
 * - <Routes> contains all application routes
 * - <Route path="/login" element={<LoginPage />} /> = when URL is /login, renders LoginPage
 * - <Navigate to="/login" replace /> = redirect from / to /login
 * - <ProtectedRoute> wraps pages that require authentication
 */

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public routes - accessible without authentication */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      <Route path="/learn" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LearningPage />} />
      <Route path="/markets" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <MarketsPage />} />

      {/* Protected routes - require authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      
      {/* Asset Detail Page */}
      <Route
        path="/asset/:symbol"
        element={
          <ProtectedRoute>
            <AssetDetailPage />
          </ProtectedRoute>
        }
      />

      {/* General / Under Construction */}
      <Route path="/social" element={<UnderConstructionPage />} />
      <Route path="/history" element={<UnderConstructionPage />} />

      {/* 404 Route - any other URL */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

