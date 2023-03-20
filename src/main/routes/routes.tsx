import React from 'react'

import { MakeLoginPage } from '@/main/factories/pages'

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
	}
})
