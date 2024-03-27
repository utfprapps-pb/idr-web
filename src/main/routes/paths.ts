export type Pages =
	| 'login'
	| 'signUp'
	| 'home'
	| 'properties'
	| 'generalRegistrations'
	| 'reports'

type PagePaths = {
	readonly [K in Pages]: string
}

export const PAGE_PATHS = Object.freeze<PagePaths>({
	login: '/login',
	signUp: '/sign-up',
	home: '/',
	properties: '/properties',
	generalRegistrations: '/general-registrations',
	reports: '/reports'
})
