import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './styles/index.css'
import App from './App.tsx'

/**
 * MAIN.TSX - Punctul de intrare al aplicației
 *
 * Structura de "învelire" (wrapping):
 *
 * StrictMode        -> Verificări de dezvoltare React
 *   BrowserRouter   -> Permite navigare cu URL-uri (fără reîncărcare)
 *     AuthProvider   -> Oferă starea de autentificare tuturor componentelor
 *       App          -> Rutele aplicației
 *
 * Ordinea contează:
 * - BrowserRouter trebuie să fie PESTE App pentru ca <Routes> să funcționeze
 * - AuthProvider trebuie să fie PESTE App pentru ca useAuth() să funcționeze oriunde
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
