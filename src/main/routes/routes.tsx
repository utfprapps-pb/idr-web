import React from 'react'

import { MakeLoginPage, MakeSignUpPage } from '@/main/factories/pages'

type RouteProps = {
	path: () => string
	component: React.ReactNode
}

type Pages = 'login' | 'signUp' | 'dashboard' | 'animals'

type RoutesProps = {
	[key in Pages]: RouteProps
}

export const ROUTES = Object.freeze<RoutesProps>({
	login: {
		path: () => '/login',
		component: <MakeLoginPage />
	},
	signUp: {
		path: () => '/signUp',
		component: <MakeSignUpPage />
	},
	dashboard: {
		path: () => '/',
		component: <h1>Under construction!</h1>
	},
	animals: {
		path: () => '/animals',
		component: <h1>Animals</h1>
	}
})
