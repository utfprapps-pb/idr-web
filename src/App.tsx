import { Toaster } from 'react-hot-toast'

import './core/styles/globals.css'

import { Router } from './core/main/routes'

export function App() {
  return (
    <>
      <Router />
      <Toaster position="top-right" reverseOrder={false} gutter={26} />
    </>
  )
}
