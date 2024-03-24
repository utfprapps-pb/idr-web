import { MakeLoginPage, MakeSignUpPage } from '@/main/factories/pages'
import { PrivateRouteProxy } from '@/main/proxies'

import { PAGE_PATHS, Pages } from './paths'

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
	home: {
		path: () => PAGE_PATHS.home,
		component: (
			<PrivateRouteProxy>
				<h1>Under construction!</h1>
			</PrivateRouteProxy>
		)
	},
	properties: {
		path: () => PAGE_PATHS.properties,
		component: (
			<PrivateRouteProxy>
				<h1>Under construction!</h1>
			</PrivateRouteProxy>
		)
	},
	generalRegistrations: {
		path: () => PAGE_PATHS.generalRegistrations,
		component: (
			<PrivateRouteProxy>
				<h1>Under construction!</h1>
			</PrivateRouteProxy>
		)
	},
	reports: {
		path: () => PAGE_PATHS.reports,
		component: (
			<PrivateRouteProxy>
				<h1>Under construction!</h1>
			</PrivateRouteProxy>
		)
	}
})
