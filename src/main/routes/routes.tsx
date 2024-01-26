import { MakeLoginPage, MakeSignUpPage } from '@/main/factories/pages'
import { PrivateRouteProxy } from '@/main/proxies'

import { Pages } from './pages.type'
import { PAGE_PATHS } from './paths'

type RouteProps = {
	path: () => string
	component: React.ReactNode
}

type RoutesProps = {
	[key in Pages]: RouteProps
}

export const ROUTES = Object.freeze<RoutesProps>({
	login: {
		path: () => PAGE_PATHS.login,
		component: <MakeLoginPage />
	},
	signUp: {
		path: () => PAGE_PATHS.signUp,
		component: <MakeSignUpPage />
	},
	dashboard: {
		path: () => PAGE_PATHS.dashboard,
		component: (
			<PrivateRouteProxy>
				<h1>Under construction!</h1>
			</PrivateRouteProxy>
		)
	},
	animals: {
		path: () => PAGE_PATHS.animals,
		component: (
			<PrivateRouteProxy>
				<h1>Animals</h1>
			</PrivateRouteProxy>
		)
	}
})
