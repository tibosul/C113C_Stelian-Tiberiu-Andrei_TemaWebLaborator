ARHITECTURA SI DOCUMENTATIA PROIECTULUI: TRADEFLOW
================================================

Proiectul TradeFlow este o aplicatie Web Full-Stack, construita pe o stiva moderna de tehnologii:

- FRONTEND: React.js cu Vite pentru build-uri ultra-rapide. Utilizam TypeScript pentru siguranta tipurilor si Framer Motion pentru micro-animatii premium.
- DESIGN: Un sistem de design original bazat pe glassmorphism, culori vibrante (neon) si mod intunecat (dark mode) nativ, implementat folosind Vanilla CSS si utilitare Tailwind pentru flexibilitate maxima.
- BACKEND: Node.js cu Express.js, oferind un API RESTful securizat prin limbaje de rate-limiting si Helmet.
- BAZA DE DATE: PostgreSQL - Gestionare robusta a utilizatorilor, activelor si portofoliilor.
- INTEGRARI: Alpaca API (date bursiere si executie), Finnhub API (știri si date de piată), Google Maps API (stilizat dark pentru harta sediului).

TradeFlow nu este un template generic; a fost construit cu atentie la detalii si functionalitati personalizate:

- KINETIC LENS UI: Am dezvoltat un set de componente de tip "Glass Panel" cu efecte de blur si gradienti dinamici care se adapteaza contextului.
- GALERIE AUTO-ROTATIVA: Implementata in Landing Page cu tranzitii AnimatePresence (Framer Motion), schimband imaginile la fiecare 3 secunde pentru o prezentare dinamica a platformei.
- ASSET DETAIL DYNAMIC: O pagina complexa care randeaza date in timp real pentru orice activ (Stock/Crypto) folosind un template modular ce include grafice, statistici si sistem de tranzactionare integrat.
- STRATEGIC COMMAND MAP: Harta Google integrata in Landing Page a fost personalizata cu un layout custom si elemente interactive pentru a se potrivi cu identitatea vizuala a proiectului.
- GLOBAL SCROLL SYSTEM: Un sistem custom care asigura resetarea scroll-ului la navigare, oferind o experienta fluida intre Landing Page si aplicatia principala.
- MODULE UNDER CONSTRUCTION: Pagini dedicate pentru functionalitati viitoare (Social, History), dotate cu butoane inteligente de returnare bazate pe istoricul de navigare.

3. INSTRUCTIUNI DE UTILIZARE SI INSTALARE
-----------------------------------------

CERINTE INITIALE:
- Node.js (v18+)
- PostgreSQL (v14+)
- Conturi Alpaca & Finnhub pentru API Keys.

PASI INSTALARE:
1. Clonarea repository-ului.
2. Configurare Baza de Date: Executati fisierele `postgresql/schema.sql` si `postgresql/initial_data.sql`.
3. Configurare Backend: 
   - Mergeti in directorul `backend/`.
   - Rulati `npm install`.
   - Fisiere .env am lasat in repository desi nu prea e safe
   - Rulati `npm start`.
4. Configurare Frontend:
   - Mergeti in directorul `frontend/`.
   - Rulati `npm install`.
   - Rulati `npm run dev`.

DESCRIERE MODULE PRINCIPALE:
- LANDING PAGE: Prezentarea proiectului, harta interactiva si galerie auto-scrolling.
- DASHBOARD: Vizualizarea portofoliului, graficul de performanta si lista de active rapide.
- MARKETS & ASSETS: Lista detaliata a actiunilor, ETF-urilor si activelor Crypto.
- ASSET DETAIL: Analiza profunda a unui activ selectat cu optiuni de Buy/Sell.
- APP ACADEMY: Centru de invatare pentru noii investitori.
- PROFILE & SECURITY: Gestionarea setarilor contului si autentificarea securizata.

================================================
Produs dezvoltat pentru: Proiect Dezvoltare Aplicatii Web
