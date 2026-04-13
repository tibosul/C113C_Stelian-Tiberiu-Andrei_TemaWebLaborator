# Ghid Complet: Sistem de Autentificare

## ✅ Ce am creat

### Backend (`backend/index.js`)
- `POST /api/auth/register` - Înregistrare user nou
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user curent (protejat)
- Middleware `authMiddleware` - Verifică token JWT

### Frontend
```
frontend/src/
├── contexts/AuthContext.tsx       # State global auth
├── hooks/useApi.ts                # Fetch din API
├── hooks/useAuth.ts               # Hook custom auth logic
├── pages/LoginPage.tsx            # Pagina login
├── pages/RegisterPage.tsx         # Pagina register
├── pages/DashboardPage.tsx        # Dashboard protejat
├── components/ProtectedRoute.tsx  # Wrapper rute protejate
├── utils/api.ts                   # API wrapper cu token
├── utils/validators.ts            # Validare formulare
└── types/auth.ts                  # Tipuri TypeScript
```

---

## 🔧 Pași pentru a porni aplicația

### 1. Creează tabelul users în PostgreSQL

Rulează în terminal:

```bash
# Acordă permisiuni (dacă e nevoie)
sudo -u postgres psql -d trading_db -c "GRANT ALL ON SCHEMA public TO tibosul;"

# Creează tabelul users
PGPASSWORD='Tibilut2005!' psql -h localhost -U tibosul -d trading_db -c "
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"
```

### 2. Restartează backend-ul

```bash
cd /home/tibosul/School/my_trading_app/backend
# Oprește backend-ul vechi (Ctrl+C dacă rulează)
npm start
```

Backend-ul va asculta pe `http://localhost:5000`

### 3. Frontend-ul este deja pornit

```bash
cd /home/tibosul/School/my_trading_app/frontend
npm run dev
```

Frontend-ul va asculta pe `http://localhost:5173`

---

## 🧪 Testare flow complet

### 1. Înregistrează un user nou

1. Deschide `http://localhost:5173/register`
2. Completează:
   - Nume: `Test User`
   - Email: `test@example.com`
   - Parolă: `parola123`
3. Apasă "Înregistrează-te"
4. Vei fi redirectat automat la `/dashboard`

### 2. Verifică în baza de date

```bash
PGPASSWORD='Tibilut2005!' psql -h localhost -U tibosul -d trading_db -c "SELECT id, email, name FROM users;"
```

Ar trebui să vezi userul creat.

### 3. Testează logout și login

1. Din Dashboard, apasă "Logout"
2. Vei fi redirectat la `/login`
3. Conectează-te cu emailul și parola
4. Vei reveni la Dashboard

---

## 📖 Cum funcționează (explicație pas cu pas)

### Flow de Login

```
1. User completează email + parolă în LoginPage
        ↓
2. Apasă "Login" → handleSubmit()
        ↓
3. validateLoginForm() verifică datele
        ↓
4. login() din AuthContext face fetch la /api/auth/login
        ↓
5. Backend verifică în PostgreSQL:
   - Există userul cu acest email?
   - Parola se potrivește (bcrypt.compare)?
        ↓
6. Backend generează JWT token
        ↓
7. Frontend primește { token, user }
        ↓
8. Salvăm în localStorage:
   - auth_token
   - auth_user
        ↓
9. navigate('/dashboard')
        ↓
10. ProtectedRoute verifică isAuthenticated → permite accesul
```

### Flow de ProtectedRoute

```
1. User încearcă să acceseze /dashboard
        ↓
2. ProtectedRoute se randează
        ↓
3. useAuth() verifică isAuthenticated din context
        ↓
4. Contextul verifică dacă există user în state
        ↓
5. Dacă NU există → <Navigate to="/login" />
   Dacă EXISTĂ → randează children (DashboardPage)
```

### Cum funcționează JWT Token

```javascript
// Backend: generare token
const token = jwt.sign(
  { id: user.id, email: user.email },  // Datele din token
  JWT_SECRET,                          // Secret pentru semnătură
  { expiresIn: '24h' }                 // Expiră în 24 ore
);

// Backend: verificare token
const decoded = jwt.verify(token, JWT_SECRET);
// decoded = { id: '...', email: '...', iat: 123456, exp: 123456 }

// Frontend: trimitem token în header
fetch('/api/protected', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
```

---

## 🏗️ Structura Foldere - Explicație

### `contexts/` - React Context
**Ce face:** Stochează state global partajat între componente.

**De ce îl folosim:** Ca să nu facem "prop drilling" (să passăm props prin 5 componente).

**Exemplu:**
```tsx
// Orice componentă poate accesa:
const { user, login, logout } = useAuth();
```

### `hooks/` - Custom Hooks
**Ce face:** Logica reutilizabilă separată de UI.

**Diferența față de context:**
- `AuthContext` = ține STATE-ul (ce știm)
- `useAuth.ts` = ține LOGICA (ce facem) - opțional, poți ține totul în Context

### `pages/` vs `components/`
| Pages | Components |
|-------|------------|
| O pagină completă | Bucată de UI |
| Legat de o rută | Reutilizabil |
| Ex: `LoginPage.tsx` | Ex: `Button.tsx` |

### `utils/` - Helper Functions
**Ce face:** Funcții pure, testabile independent.

**Exemple:**
- `validators.ts` - Validare email, parolă
- `api.ts` - Fetch wrapper cu token automat

### `types/` - TypeScript Types
**Ce face:** Definește structurile de date.

**De ce:** Autocomplete, type safety, mai puține bug-uri.

---

## 🔐 Security Best Practices

### Ce am făcut bine:
✅ Parolele sunt hash-uite cu bcrypt  
✅ JWT token pentru sesiune  
✅ Token-ul are expiry (24h)  
✅ Middleware protejează rutele  

### Ce mai trebuie adăugat:
⚠️ HTTPS în producție  
⚠️ Rate limiting la login  
⚠️ Refresh tokens  
⚠️ Password reset flow  
⚠️ Email verification  

---

## 🚀 Cum să extinzi

### Adaugă o pagină nouă protejată

1. Creează `frontend/src/pages/PortfolioPage.tsx`
2. Adaugă ruta în `App.tsx`:
```tsx
<Route path="/portfolio" element={
  <ProtectedRoute>
    <PortfolioPage />
  </ProtectedRoute>
} />
```

### Adaugă un middleware nou în backend

```javascript
// Verifică dacă userul este admin
function adminMiddleware(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Folosire:
app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  // Doar adminii ajung aici
});
```

---

## 📚 Resurse

- [React Router](https://reactrouter.com/)
- [JWT.io](https://jwt.io/) - Decode token-uri
- [bcrypt](https://www.npmjs.com/package/bcryptjs)
- [React Context](https://react.dev/reference/react/useContext)
