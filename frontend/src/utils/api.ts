/**
 * API Utility - Fetch wrapper cu autentificare
 *
 * De ce folosim acest wrapper în loc de fetch direct:
 * 1. Adaugă automat token-ul de autentificare la fiecare request
 * 2. Gestionează erorile de autentificare (401)
 * 3. Setează automat headers pentru JSON
 * 4. Centralizează baza URL-ului
 *
 * Cum se folosește:
 * const data = await api.get<StockData[]>('/stocks');
 * const result = await api.post('/orders', { symbol: 'AAPL', quantity: 10 });
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Interfață pentru opțiuni request
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Funcția principală de fetch
 *
 * @param endpoint - Ruta API (fără baza URL)
 * @param options - Opțiuni request (method, body, headers)
 * @returns Promise cu datele din response
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  // Luăm token-ul din localStorage
  const token = localStorage.getItem('auth_token');

  // Construim headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Adăugăm token-ul dacă există
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Construim URL-ul complet
  const url = `${API_BASE_URL}${endpoint}`;

  // Configurăm request-ul
  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // Adăugăm body dacă există (și îl transformăm în JSON)
  if (body) {
    config.body = JSON.stringify(body);
  }

  // Facem fetch
  const response = await fetch(url, config);

  // Încercăm să parsăm JSON
  const data = await response.json();

  // Gestionăm erorile
  if (!response.ok) {
    // 401 = Unauthorized (token expirat sau invalid)
    if (response.status === 401) {
      // Curățăm token-ul expirat
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Redirectăm către login (opțional, poate fi gestionat de componentă)
      window.location.href = '/login';
    }

    // Aruncăm eroarea cu mesajul de la backend
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data as T;
}

/**
 * Shortcut-uri pentru metode comune
 */
export const api = {
  // GET request
  get<T>(endpoint: string) {
    return apiFetch<T>(endpoint, { method: 'GET' });
  },

  // POST request
  post<T>(endpoint: string, body: unknown) {
    return apiFetch<T>(endpoint, { method: 'POST', body });
  },

  // PUT request
  put<T>(endpoint: string, body: unknown) {
    return apiFetch<T>(endpoint, { method: 'PUT', body });
  },

  // DELETE request
  delete<T>(endpoint: string) {
    return apiFetch<T>(endpoint, { method: 'DELETE' });
  },

  // PATCH request
  patch<T>(endpoint: string, body: unknown) {
    return apiFetch<T>(endpoint, { method: 'PATCH', body });
  },
};
