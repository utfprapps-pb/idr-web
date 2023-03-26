import React from 'react'

import { GithubLogo } from 'phosphor-react'

import * as S from './styles'
import { AuthContainerTemplateProps } from './types'
import { Text } from '@/presentation/components'

export const AuthContainerTemplate: React.FC<AuthContainerTemplateProps> = ({
	title,
	description,
	body,
	footer,
	handleSubmit
}) => (
	<S.Container>
		<S.Form
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			{/* ToDo @Minozzzi: Change to IDR icon */}
			<GithubLogo size={64} style={S.iconStyles} />

			<S.FormHeader>
				<Text size="h4" color="black">
					{title}
				</Text>

				<Text size="b3" color="black">
					{description}
				</Text>
			</S.FormHeader>

			<S.FormBody>{body}</S.FormBody>

			<S.FormFooter>{footer}</S.FormFooter>
		</S.Form>
	</S.Container>
)
