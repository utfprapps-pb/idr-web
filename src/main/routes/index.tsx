import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes'

export const Router: React.FC = () => (
  <Routes>
    {Object.entries(ROUTES).map(([key, route]) => (
      <Route key={key} path={route.path()} element={route.component} />
    ))}

    <Route path="*" element={<h1>404</h1>} />
  </Routes>
)
