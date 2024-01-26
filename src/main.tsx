import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Compose } from '@/presentation/components/ui'
import { theme } from '@/styles/themes'

import { App } from './App'
import { AuthProvider } from './presentation/store'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Compose components={[AuthProvider]}>
					<App />
				</Compose>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
)
