export const PAGE_PATHS = Object.freeze({
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY: '/properties/:propertyId',
  FORAGES: '/properties/:propertyId/forages',
  GENERAL_REGISTRATIONS: '/general-registrations',
  REPORTS: '/reports',
} as const)
