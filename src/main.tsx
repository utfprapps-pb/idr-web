import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Compose } from '@/presentation/components/utils'

import { App } from './App'
import { env } from './main/env'
import { AuthProvider } from './presentation/store'

async function bootstrap() {
	if (env.VITE_API_MOCKED) {
		const { worker } = await import('./mocks/browser')
		worker.start()
	}

	createRoot(document.getElementById('root') as HTMLElement).render(
		<StrictMode>
			<BrowserRouter>
				<Compose components={[AuthProvider]}>
					<App />
				</Compose>
			</BrowserRouter>
		</StrictMode>
	)
}
bootstrap()
