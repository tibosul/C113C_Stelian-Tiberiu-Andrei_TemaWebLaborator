import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './styles/index.css'
import App from './App.tsx'

/**
 * MAIN.TSX - Application entry point
 *
 * Wrapping structure:
 *
 * StrictMode        -> React development checks
 *   BrowserRouter   -> Enables navigation with URLs (single-page app)
 *     AuthProvider   -> Provides authentication state to all components
 *       App          -> Application routes
 *
 * Order matters:
 * - BrowserRouter must be ABOVE App for <Routes> to work
 * - AuthProvider must be ABOVE App for useAuth() to work anywhere
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
