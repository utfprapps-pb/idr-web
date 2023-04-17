import React from 'react'

import { MakeLoginPage, MakeSignUpPage } from '@/main/factories/pages'
import { useAuth } from '@/presentation/store'

const Dash = () => {
	const { auth } = useAuth()
	return (
		<>
			<h1>Hello logged!!</h1>
			<h2>{auth?.token}</h2>
		</>
	)
}

type RouteProps = {
	path: () => string
	component: React.ReactNode
}

type Pages = 'login' | 'signUp' | 'dashboard'

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
		component: <Dash />
	}
})
