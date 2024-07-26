export const VITE_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || 'TEST-bfb5f681-fd31-4952-899b-11754a619f1c'
export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-bd0lpc8g2yokggoq.us.auth0.com'
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID || 'bIAB5ZIDrbrj4bTnT8cXwPD1x2rgQiou'
export const AUTH0_CLIENT_SECRET = import.meta.env.VITE_AUTH0_CLIENT_SECRET || 'xxpuBjlhiu_Jp7rsxOaDlb3QXroe69VXjA0nYyO4TVYWaD8fqaMFCmqdbnY7nJFX'
export const AUTH0_AUDIENCE = import.meta.VITE_AUTH0_AUDIENCE || 'https://dev-bd0lpc8g2yokggoq.us.auth0.com/api/v2/'

export const FRONT_PORT = import.meta.VITE_FRONTPORT || '5175'
export const FRONT_URL_BASE = import.meta.FRONT_URL_BASE || 'http://localhost'
export const FRONT_URL_BASE_FULL = `${FRONT_URL_BASE}:${FRONT_PORT}` || 'http://localhost:5175'

export const BACK_PORT = import.meta.VITE_BACK_PORT || '3001'
export const BACK_URL_BASE = import.meta.URL_BASE || 'http://localhost'
export const BACK_URL_BASE_FULL = `${BACK_URL_BASE}:${BACK_PORT}` || 'http://localhost:3001'

// export const DEPLOY_FRONT_URL_BASE_FULL = 'https://pf-fordevs.vercel.app'
// export const DEPLOY_BACK_URL_BASE_FULL = 'https://pf-backend-production-a774.up.railway.app'

export const MP_TEST_PUBLIC_KEY = 'TEST-bfb5f681-fd31-4952-899b-11754a619f1c'
