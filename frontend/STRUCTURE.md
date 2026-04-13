# Structura Frontend - React + Vite

Acest document explică organizarea folderele și cum se compară cu alte proiecte React.

---

## 📁 Structura Actuală

```
frontend/src/
├── main.tsx          # Punctul de intrare (entry point)
├── App.tsx           # Componenta principală cu rute
├── assets/           # Imagini, fonturi, SVG-uri
├── components/       # Componente reutilizabile
├── contexts/         # Contexte React (state global)
├── hooks/            # Custom hooks
├── pages/            # Pagini complete (rute)
├── styles/           # Fișiere CSS/Tailwind
├── types/            # Tipuri TypeScript
└── utils/            # Funcții utilitare
```

---

## 📚 Ce face fiecare folder?

### `main.tsx` - Entry Point
**Ce face:** Inițializează aplicația și "învelește" componentele cu provider-e.

**De ce e important:** Aici se montează React pe DOM și se configurează provider-e globale (BrowserRouter, AuthProvider, ThemeProvider, etc.).

**Exemplu real:**
```tsx
// În main.tsx
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```

---

### `App.tsx` - Root Component
**Ce face:** Definește structura de rute și layout-ul principal.

**De ce e important:** Toate rutele aplicației sunt definite aici.

**Exemplu real:**
```tsx
// În App.tsx
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    </Routes>
  );
}
```

---

### `components/` - Componente Reutilizabile
**Ce conține:** Componente mici, de sine stătătoare, care pot fi folosite în mai multe locuri.

**Exemple:**
- `Header.tsx` - Header-ul aplicației
- `Button.tsx` - Buton customizat
- `ProtectedRoute.tsx` - Wrapper pentru rute protejate

**Când să pui aici:** Când o componentă este folosită în 2+ locuri diferite sau are o singură responsabilitate clară.

**NU pune aici:** Pagini complete (alea merg în `pages/`).

---

### `pages/` - Pagini Complete
**Ce conține:** Componente care reprezintă o pagină întreagă, asociată cu o rută.

**Exemple:**
- `LoginPage.tsx` - Pagina de login (`/login`)
- `DashboardPage.tsx` - Dashboard-ul (`/dashboard`)
- `RegisterPage.tsx` - Pagina de înregistrare (`/register`)

**Diferența față de `components/`:**
- `pages/` = o pagină completă, legată de o rută specifică
- `components/` = bucată de UI reutilizabilă în mai multe pagini

---

### `contexts/` - React Context
**Ce conține:** Provider-e pentru state global partajat între mai multe componente.

**Exemple:**
- `AuthContext.tsx` - Starea de autentificare (user, token, login, logout)
- `ThemeContext.tsx` - Tema aplicației (dark/light)
- `NotificationContext.tsx` - Sistem de toast/notificări

**Când să folosești:**
- Când ai state care trebuie accesat din multe componente
- Evită "prop drilling" (passing props through many levels)

**Exemplu real:**
```tsx
// AuthContext.tsx
const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (email, password) => { ... };
  const logout = () => { ... };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Folosire în orice componentă:
const { user, login, logout } = useAuth();
```

---

### `hooks/` - Custom Hooks
**Ce conține:** Funcții care encapsulează logică reutilizabilă.

**Exemple:**
- `useApi.ts` - Fetch din API cu loading/error state
- `useAuth.ts` - (opțional) hook pentru auth, separat de context
- `useLocalStorage.ts` - Persistență în localStorage

**Când să folosești:**
- Când ai logică care se repetă în mai multe componente
- Pentru a separa "logic" de "UI"

**Exemplu real:**
```tsx
// hooks/useApi.ts
export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(endpoint).then(...);
  }, [endpoint]);

  return { data, loading, error };
}

// Folosire:
const { data: stocks, loading } = useApi<StockData[]>('/api/stocks');
```

---

### `types/` - Tipuri TypeScript
**Ce conține:** Interfețe, tipuri, enums pentru TypeScript.

**Exemple:**
- `api.ts` - Tipuri pentru răspunsuri API
- `auth.ts` - Tipuri pentru autentificare
- `stock.ts` - Tipuri pentru date trading

**De ce e important:**
- Type safety în tot codul
- Autocomplete în IDE
- Prindem erori înainte de runtime

**Exemplu real:**
```tsx
// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
```

---

### `utils/` - Funcții Utilitare
**Ce conține:** Funcții pure, helper-e, formatare date.

**Exemple:**
- `formatDate.ts` - Formatare date
- `validators.ts` - Validare email, parolă
- `api.ts` - Config axios/fetch base

**Când să folosești:**
- Funcții care nu sunt React-specific
- Logică care poate fi testată independent

**Exemplu real:**
```tsx
// utils/validators.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON'
  }).format(amount);
}
```

---

### `assets/` - Resurse Statice
**Ce conține:** Imagini, fonturi, SVG-uri, iconițe.

**Exemple:**
- `logo.svg` - Logo aplicație
- `fonts/` - Fonturi custom
- `images/` - Poze, ilustrații

---

### `styles/` - CSS și Stiluri
**Ce conține:** Fișiere CSS, configurații Tailwind.

**Exemple:**
- `index.css` - CSS global, importuri Tailwind
- `components.css` - Stiluri specifice (dacă e nevoie)

---

## 🔄 Flux de Date Tipic

```
User acționează → Page Component → Custom Hook → API Call
                                            ↓
                                      AuthContext (token)
                                            ↓
                                      Backend Response
                                            ↓
                                      Update State
                                            ↓
                                      UI se actualizează
```

---

## 📦 Comparație cu Alte Proiecte React

### Structură "Feature-based" (alternativă)
Unele proiecte organizează altfel:
```
src/
├── features/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── authContext.tsx
│   ├── dashboard/
│   │   └── ...
│   └── portfolio/
│       └── ...
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
```

**Când să folosești feature-based:**
- Proiecte mari (10+ pagini)
- Echipe multiple lucrând la feature-uri diferite
- Vrei "cohesion" - tot ce ține de un feature e împreună

**Când să folosești structura actuală:**
- Proiecte mici-mijlocii
- E mai clar pentru începători
- Separație clară între "UI" și "logică"

---

## ✅ Reguli de Aur

1. **Pages vs Components:**
   - Page = o rută întreagă
   - Component = bucată de UI reutilizabilă

2. **Context vs State:**
   - State local = pentru o singură componentă
   - Context = pentru state partajat global

3. **Hooks:**
   - Extrage logică care se repetă
   - Separă "ce face" de "cum arată"

4. **Types:**
   - Definește tipurile în `types/`
   - Importează-le oriunde ai nevoie

---

## 🔗 Resurse

- [React Router Docs](https://reactrouter.com/)
- [React Context Docs](https://react.dev/reference/react/useContext)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
