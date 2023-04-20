import styled, { CSSProperties } from 'styled-components'

import { darken } from '@/main/utils'

export const iconStyles: CSSProperties = {
	alignSelf: 'center'
}

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	background: ${({ theme }) =>
		darken({ color: theme.colors.primary, percentage: 0.3 })};
	min-height: 100vh;
`

type FormProps = {
	maxWidth: string
}

export const Form = styled.form<FormProps>`
	background: ${({ theme }) => theme.colors.white};
	border-radius: 12px;

	padding: 42px 64px;
	width: 100%;
	max-width: ${({ maxWidth }) => maxWidth};

	display: flex;
	flex-direction: column;

	gap: 48px;

	${({ theme }) => theme.media.forPhoneOnly()} {
		padding: 32px 24px;

		border-radius: 0;

		height: 100%;
		min-height: 100vh;
	}
`

export const FormHeader = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: flex-start;

	width: 100%;
	gap: 4px;
`

export const FormBody = styled.div`
	display: flex;
	flex-direction: column;

	align-items: flex-start;
	justify-content: flex-start;

	width: 100%;
	gap: 24px;
	margin: auto 0;

	${({ theme }) => theme.media.forPhoneOnly()} {
		gap: 12px;
	}
`

export const FormFooter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
	gap: 8px;
	margin-top: auto;
`
