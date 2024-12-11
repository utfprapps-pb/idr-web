import { ReactNode } from 'react'

import { Route, Routes } from 'react-router-dom'

import * as PageFactory from '@/main/factories/pages'

import { PrivateRouteProxy } from '../proxies'

import { ROUTES } from './routes'

const ROUTE_PAGE_MAPPER: Record<keyof typeof ROUTES, ReactNode> = {
  LOGIN: <PageFactory.MakeLoginPage />,
  SIGN_UP: <PageFactory.MakeSignUpPage />,
  HOME: (
    <PrivateRouteProxy>
      <h1>Under construction!</h1>
    </PrivateRouteProxy>
  ),
  PROPERTIES: (
    <PrivateRouteProxy>
      <PageFactory.MakePropertyPage />
    </PrivateRouteProxy>
  ),
  PROPERTIES_DETAILS: (
    <PrivateRouteProxy>
      <PageFactory.MakePropertyDetailsPage />
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

export const Router: React.FC = () => (
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
