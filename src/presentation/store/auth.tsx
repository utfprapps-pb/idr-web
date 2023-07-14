import React, {
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
import { baseAxios } from '@/infra/http'
import { makeRemoteLoginUser } from '@/main/factories/useCases/user'
import { useIdrHistory } from '@/presentation/hooks/'

type AuthContextProps = {
	auth: UserModel | null
	loading: boolean

	handleSignIn: (params: LoginUserParams) => Promise<void>
	handleSignOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
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

	const [loading, setLoading] = useState(false)

	const handleSignIn = useCallback(
		async (params: LoginUserParams) => {
			try {
				setLoading(true)

				const remoteLoginAccount = makeRemoteLoginUser()

				const currentAccount = await remoteLoginAccount.login(params)

				setAuthData(currentAccount)
				navigateToSignedBasePath()
			} catch (error) {
				if (error instanceof InvalidCredentialsError) {
					toast.error('Credenciais inválidas')
					return
				}

				toast.error('Erro inesperado, tente novamente mais tarde')
			} finally {
				setLoading(false)
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

			baseAxios.defaults.headers.Authorization = `Bearer ${authData.token}`

			return
		}

		delete baseAxios.defaults.headers.Authorization
		LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
	}, [authData])

	const providerProps = useMemo(
		() => ({
			auth: authData,
			loading,
			handleSignIn,
			handleSignOut
		}),
		[authData, handleSignIn, handleSignOut, loading]
	)

	return (
		<AuthContext.Provider value={providerProps}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
