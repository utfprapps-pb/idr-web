import { Toaster } from 'react-hot-toast'

import './styles/globals.css'

import { Router } from './main/routes'

export const App = () => (
  <>
    <Router />
    <Toaster position="top-right" reverseOrder={false} gutter={26} />
  </>
)
