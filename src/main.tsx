import React from 'react'

import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AuthProvider } from './presentation/store'
import { Router } from '@/main/routes'
import { ResetStyle, theme } from '@/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<Router />
					<ResetStyle />
					<Toaster position="top-right" reverseOrder={false} gutter={26} />
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
