# Project Context

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **API**: Alpaca (trading)

## Commands

### Backend
```bash
cd backend
npm start        # production
npm run dev      # hot-reload
```

### Frontend
```bash
cd frontend
npm run dev      # dev server
npm run build    # production build
npm run lint     # ESLint check
```

## API Endpoints
- `GET /api/health` - Backend health check
- `GET /api/db/status` - PostgreSQL connection status
- `GET /api/alpaca/status` - Alpaca API connection status

## Guidelines
- Keep responses concise and direct
- No emojis unless requested
- Use TypeScript in frontend, JavaScript in backend
- Follow existing code patterns
