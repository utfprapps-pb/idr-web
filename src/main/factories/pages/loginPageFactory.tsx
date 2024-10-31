import { LoginPage } from '@/presentation/pages'

import { AuthDataFactory } from '../useCases/auth'

export const MakeLoginPage: React.FC = () => (
  <LoginPage remoteLogin={AuthDataFactory.makeRemoteLogin()} />
)
