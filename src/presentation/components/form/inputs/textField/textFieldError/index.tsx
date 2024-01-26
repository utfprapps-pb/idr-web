import { useTextFieldContext } from '../contexts/textFieldContext'

import * as S from './styles'

export const TextFieldError: React.FC = () => {
	const { error } = useTextFieldContext()
	return <S.ErrorLabel>{error}</S.ErrorLabel>
}
