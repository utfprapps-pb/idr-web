import { PAGE_PATHS } from './paths'

export const ROUTES = {
  LOGIN: {
    path: PAGE_PATHS.LOGIN,
  },
  SIGN_UP: {
    path: PAGE_PATHS.SIGN_UP,
  },
  PASSWORD_RECOVERY: {
    path: PAGE_PATHS.PASSWORD_RECOVERY,
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
  PRODUCERS: {
    path: PAGE_PATHS.PRODUCERS,
  },
  GENERAL_REGISTRATIONS: {
    path: PAGE_PATHS.GENERAL_REGISTRATIONS,
  },
  REPORTS: {
    path: PAGE_PATHS.REPORTS,
  },
  USERS: {
    path: PAGE_PATHS.USERS,
  },
}
