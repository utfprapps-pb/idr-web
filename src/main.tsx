import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Router } from '@/main/routes'
import { GlobalStyles } from '@/styles/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Router />
			<GlobalStyles />
		</BrowserRouter>
	</React.StrictMode>
)
