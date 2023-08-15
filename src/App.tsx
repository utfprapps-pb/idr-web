import { Toaster } from 'react-hot-toast'

import { Router } from './main/routes'
import { ResetStyle } from './styles'

export const App = () => (
	<>
		<Router />
		<ResetStyle />
		<Toaster position="top-right" reverseOrder={false} gutter={26} />
	</>
)
