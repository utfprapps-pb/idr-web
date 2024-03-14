import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import toast from 'react-hot-toast'

import { InvalidCredentialsError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { LoginUserParams } from '@/domain/useCases'
import { LocalStorageAdapter } from '@/infra/cache'
import { baseApi } from '@/infra/http'
import { makeRemoteLoginUser } from '@/main/factories/useCases/user'
import { useIdrHistory } from '@/presentation/hooks/'

type AuthContextProps = {
	auth: UserModel | null

	handleSignIn: (params: LoginUserParams) => Promise<void>
	handleSignOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { navigateToSignedBasePath } = useIdrHistory()

	const [authData, setAuthData] = useState<AuthContextProps['auth'] | null>(
		() => {
			const auth = LocalStorageAdapter.get(
				LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
			) as AuthContextProps['auth']

			if (auth) return auth
			return null
		}
	)

	const handleSignIn = useCallback(
		async (params: LoginUserParams) => {
			try {
				const remoteLoginAccount = makeRemoteLoginUser()

				const currentAccount = await remoteLoginAccount.execute(params)

				setAuthData(currentAccount)
				navigateToSignedBasePath()
			} catch (error) {
				if (error instanceof InvalidCredentialsError) {
					toast.error('Credenciais inválidas')
					return
				}

				toast.error('Erro inesperado, tente novamente mais tarde')
			}
		},
		[navigateToSignedBasePath]
	)

	const handleSignOut = useCallback(() => {
		setAuthData(null)
	}, [])

	useEffect(() => {
		if (authData) {
			LocalStorageAdapter.set(
				LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH,
				authData
			)

			baseApi.defaults.headers.Authorization = `Bearer ${authData.token}`

			return
		}

		delete baseApi.defaults.headers.Authorization
		LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
	}, [authData])

	const providerProps = useMemo(
		() => ({
			auth: authData,
			handleSignIn,
			handleSignOut
		}),
		[authData, handleSignIn, handleSignOut]
	)

	return (
		<AuthContext.Provider value={providerProps}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
