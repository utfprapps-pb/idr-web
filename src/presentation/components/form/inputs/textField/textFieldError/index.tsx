import * as S from './styles'
import { useTextFieldContext } from '../contexts/textFieldContext'

export const TextFieldError: React.FC = () => {
	const { error } = useTextFieldContext()
	return <S.ErrorLabel>{error}</S.ErrorLabel>
}
