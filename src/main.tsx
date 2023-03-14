import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from '@/main/routes'
import { ResetStyle } from '@/styles'
import { theme } from '@/styles/themes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<BrowserRouter>
				<Router />
				<ResetStyle />
			</BrowserRouter>
		</React.StrictMode>
	</ThemeProvider>
)
