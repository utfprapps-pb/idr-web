import * as S from './styles'
import { LoadingProps } from './types'

export const Loading: React.FC<LoadingProps> = ({ size = 14 }) => (
	<S.Loading size={size} />
)
