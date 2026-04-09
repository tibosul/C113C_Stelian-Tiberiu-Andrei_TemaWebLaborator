# Trading App

Aplicație de trading cu frontend React + TypeScript și backend Node.js.

## Structură

```
my_trading_app/
├── frontend/
│   └── src/
│       ├── components/     # Componente React (Header, ServerStatus)
│       ├── hooks/          # Custom hooks (useApi, useHealthCheck)
│       ├── styles/         # Fișiere CSS
│       ├── types/          # Tipuri TypeScript
│       ├── utils/          # Utilitare
│       ├── App.tsx         # Componenta principală
│       └── main.tsx        # Entry point
└── backend/
    └── index.js            # Server Express + endpoint-uri
```

## Pornire

### Backend
```bash
cd backend
npm start        # sau npm run dev pentru hot-reload
```

### Frontend
```bash
cd frontend
npm run dev
```

## Endpoint-uri API

| Method | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/api/health` | Verifică status backend |
| GET | `/api/db/status` | Verifică conexiunea PostgreSQL |
| GET | `/api/alpaca/status` | Verifică conexiunea Alpaca |
