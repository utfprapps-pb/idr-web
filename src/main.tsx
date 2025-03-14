import { StrictMode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { env } from './core/env'
import { Compose } from './core/presentation/components/utils'
import { AuthProvider } from './core/presentation/contexts'

async function bootstrap() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  if (env.VITE_API_MOCKED) {
    const { worker } = await import('./core/mocks/browser')
    await worker.start()
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <Compose
          components={[
            {
              component: QueryClientProvider,
              props: { client: queryClient },
            },
            {
              component: AuthProvider,
            },
          ]}
        >
          <App />
          <ReactQueryDevtools />
        </Compose>
      </BrowserRouter>
    </StrictMode>
  )
}

bootstrap()
