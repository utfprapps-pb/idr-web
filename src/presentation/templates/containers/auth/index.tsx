import { GithubLogo } from 'phosphor-react'

import { Text } from '@/presentation/components/ui'

import * as S from './styles'
import { AuthContainerTemplateProps } from './types'

export const AuthContainerTemplate: React.FC<AuthContainerTemplateProps> = ({
	title,
	description,
	body,
	footer,
	maxWidth,
	handleSubmit
}) => (
	<S.Container>
		<S.Form
			maxWidth={maxWidth}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			{/* ToDo @Minozzzi: Change to IDR icon */}
			<GithubLogo size={64} style={S.iconStyles} />

			<S.FormHeader>
				<Text size="h4" color="text">
					{title}
				</Text>

				<Text size="b3" color="text">
					{description}
				</Text>
			</S.FormHeader>

			<S.FormBody>{body}</S.FormBody>

			<S.FormFooter>{footer}</S.FormFooter>
		</S.Form>
	</S.Container>
)
