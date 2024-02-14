import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Compose } from '@/presentation/components/utils'

import { App } from './App'
import { AuthProvider } from './presentation/store'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<Compose components={[AuthProvider]}>
				<App />
			</Compose>
		</BrowserRouter>
	</StrictMode>
)
