import { useNavigate } from 'react-router-dom'

import { generateRoutePath } from '@/main/routes/generateRoutePath'

export const useIdrNavigate = () => {
  const navigate = useNavigate()
  const navigateToBasePath = () => navigate(generateRoutePath('LOGIN'))
  const navigateToSignedBasePath = () => navigate(generateRoutePath('HOME'))

  return {
    navigate,
    navigateToBasePath,
    navigateToSignedBasePath,
  }
}
