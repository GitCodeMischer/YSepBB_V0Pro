/**
 * API Routes configuration
 * Centralized definition of API endpoints for the application
 */

export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESET_PASSWORD: '/api/auth/reset-password',
    TWO_FACTOR: {
      GENERATE_SECRET: '/api/auth/2fa/generate-secret',
      VERIFY_CODE: '/api/auth/2fa/verify-code',
      SET_STATUS: '/api/auth/2fa/set-status',
      RECOVERY_CODES: {
        GET: '/api/auth/2fa/recovery-codes',
        GENERATE: '/api/auth/2fa/recovery-codes/generate',
        VERIFY: '/api/auth/2fa/recovery-codes/verify'
      }
    }
  },
  
  // User routes
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile/update',
    SETTINGS: '/api/user/settings',
    PREFERENCES: '/api/user/preferences'
  },
  
  // Finance routes
  FINANCE: {
    ACCOUNTS: '/api/finance/accounts',
    TRANSACTIONS: '/api/finance/transactions',
    BUDGET: '/api/finance/budget',
    REPORTS: '/api/finance/reports',
    SUBSCRIPTIONS: '/api/finance/subscriptions'
  }
};

export default API_ROUTES; 