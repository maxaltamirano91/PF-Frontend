export const AUTH0_DOMAIN = import.meta.VITE_AUTH0_DOMAIN || ''
export const AUTH0_CLIENT_ID = import.meta.VITE_AUTH0_CLIENT_ID || ''
export const AUTH0_CLIENT_SECRET = import.meta.VITE_AUTH0_CLIENT_SECRET || ''
export const AUTH0_AUDIENCE = import.meta.VITE_AUTH0_AUDIENCE || ''

export const PORT = import.meta.VITE_PORT || '5173'
export const URL_BASE = import.meta.URL_BASE || 'http://localhost'
export const URL_BASE_FULL = `${URL_BASE}:${PORT}` || 'http://localhost:5173'