import { useNavigate } from 'react-router-dom'

import { PAGE_PATHS } from '@/main/routes/paths'

export const useIdrHistory = () => {
	const navigate = useNavigate()
	const navigateToBasePath = () => navigate(PAGE_PATHS.login)
	const navigateToSignedBasePath = () => navigate(PAGE_PATHS.dashboard)

	return {
		navigate,
		navigateToBasePath,
		navigateToSignedBasePath
	}
}
