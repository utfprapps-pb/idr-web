import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { LocalStorageAdapter } from '@/infra/cache'
import { UserDataFactory } from '@/main/factories/useCases/user'
import { useIdrHistory } from '@/presentation/hooks/'

import type { UserModel } from '@/domain/models/userModel'

type AuthContextProps = {
	signedIn: boolean
	user?: UserModel

	signIn(accessToken: string): void
	signOut(): void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const meService = UserDataFactory.makeRemoteMe()
	const { navigateToBasePath, navigateToSignedBasePath } = useIdrHistory()

	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAccessToken = LocalStorageAdapter.get(
			LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
		)

		return !!storedAccessToken
	})

	const { isError, isSuccess, data, isLoading } = useQuery({
		queryKey: ['users', 'me'],
		queryFn: async () => meService.execute(),
		enabled: signedIn,
		staleTime: Infinity
	})

	const signIn = useCallback(
		(accessToken: string) => {
			LocalStorageAdapter.set(
				LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH,
				accessToken
			)
			navigateToSignedBasePath()
			setSignedIn(true)
		},
		[navigateToSignedBasePath]
	)

	const signOut = useCallback(() => {
		LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
		setSignedIn(false)
		navigateToBasePath()
	}, [navigateToBasePath])

	useEffect(() => {
		if (!signedIn) {
			toast.error('Sua sessão expirou!')
			signOut()
		}
	}, [isError, signOut, signedIn])

	const providerProps = useMemo(
		() => ({
			signedIn: signedIn && isSuccess,
			user: data,
			signIn,
			signOut
		}),
		[data, isSuccess, signIn, signOut, signedIn]
	)

	return (
		<AuthContext.Provider value={providerProps}>
			{!isLoading && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
