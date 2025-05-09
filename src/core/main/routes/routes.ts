import { PAGE_PATHS } from './paths'

export const ROUTES = {
  LOGIN: {
    path: PAGE_PATHS.LOGIN,
  },
  SIGN_UP: {
    path: PAGE_PATHS.SIGN_UP,
  },
  HOME: {
    path: PAGE_PATHS.HOME,
  },
  PROPERTIES: {
    path: PAGE_PATHS.PROPERTIES,
  },
  PROPERTY: {
    path: PAGE_PATHS.PROPERTY,
    params: {
      propertyId: true,
    },
    query: {
      property: true,
      producer: true,
    },
  },
  GENERAL_REGISTRATIONS: {
    path: PAGE_PATHS.GENERAL_REGISTRATIONS,
  },
  REPORTS: {
    path: PAGE_PATHS.REPORTS,
  },
}
