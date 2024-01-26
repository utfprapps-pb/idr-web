import { Pages } from './pages.type'

type PagePaths = {
	readonly [K in Pages]: string
}

export const PAGE_PATHS = Object.freeze<PagePaths>({
	login: '/login',
	signUp: '/sign-up',
	dashboard: '/dashboard',
	animals: '/animals'
})
