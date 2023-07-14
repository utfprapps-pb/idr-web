import styled, { css } from 'styled-components'

export const ErrorLabel = styled.span`
	${({ theme: { colors, fontFamily, fontSizes } }) => css`
		color: ${colors.error};

		font-family: ${fontFamily.primary};
		font-size: ${fontSizes.b4};
	`}

	text-align: end;
	font-weight: 400;
`
