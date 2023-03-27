import React from 'react'

import { MakeLoginPage } from '@/main/factories/pages'
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

type RoutesProps = {
	[key: string]: RouteProps
}

export const ROUTES = Object.freeze<RoutesProps>({
	login: {
		path: () => '/login',
		component: <MakeLoginPage />
	},
	dashboard: {
		path: () => '/',
		component: <Dash />
	}
})
