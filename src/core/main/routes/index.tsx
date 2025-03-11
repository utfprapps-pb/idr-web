import { ReactNode } from 'react'

import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '@/app/pages/login-page'
import { PropertiesPage } from '@/app/pages/properties-page'
import { PropertyPage } from '@/app/pages/property-page'
import { SignUpPage } from '@/app/pages/sign-up-page'

import { PrivateRouteProxy } from '../proxies'

import { ROUTES } from './routes'

const ROUTE_PAGE_MAPPER: Record<keyof typeof ROUTES, ReactNode> = {
  LOGIN: <LoginPage />,
  SIGN_UP: <SignUpPage />,
  HOME: (
    <PrivateRouteProxy>
      <h1>Under construction!</h1>
    </PrivateRouteProxy>
  ),
  PROPERTIES: (
    <PrivateRouteProxy>
      <PropertiesPage />
    </PrivateRouteProxy>
  ),
  PROPERTIES_DETAILS: (
    <PrivateRouteProxy>
      <PropertyPage />
    </PrivateRouteProxy>
  ),
  GENERAL_REGISTRATIONS: (
    <PrivateRouteProxy>
      <h1>Under construction!</h1>
    </PrivateRouteProxy>
  ),
  REPORTS: (
    <PrivateRouteProxy>
      <h1>Under construction!</h1>
    </PrivateRouteProxy>
  ),
}

export function Router() {
  return (
    <Routes>
      {Object.entries(ROUTES).map(([key, route]) => (
        <Route
          key={key}
          path={route.path}
          element={ROUTE_PAGE_MAPPER[key as keyof typeof ROUTES]}
        />
      ))}

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}
