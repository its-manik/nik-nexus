export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const ROUTES = {
  HOME: '/',
  BLOCKS: '/blocks',
  BLOCK: '/block/:id',
  ALGORITHMS: '/algorithms',
  ALGORITHM: '/algorithm/:id',
  ALGORITHM_CODE: '/algorithm/:id/code',
  BENCHMARKS: '/benchmarks',
  BENCHMARK: '/benchmark/:id',
  CHALLENGES: '/challenges',
  CHALLENGE: '/challenge/:id',
  ACCOUNTS: '/accounts',
  ACCOUNT: '/account/:id',
  PROOFS: '/proofs',
  PROOF: '/proof/:id',
  CONFIG: '/config',
} as const;

export const PAGE_SIZES = [10, 25, 50, 100] as const;

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const STATUS_COLORS = {
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  info: 'text-blue-600 bg-blue-100',
} as const;