import { useNavigate } from 'react-router-dom'

import { generateRoutePath } from '@/core/main/routes/generate-route-path'

export function useIdrNavigate() {
  const navigate = useNavigate()
  const navigateToBasePath = () => navigate(generateRoutePath('LOGIN'))
  const navigateToSignedBasePath = () => navigate(generateRoutePath('HOME'))

  return {
    navigate,
    navigateToBasePath,
    navigateToSignedBasePath,
  }
}
