import styled, { css } from 'styled-components'

export const Container = styled.em<{ isClickable: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	${({ isClickable }) => css`
		cursor: ${isClickable ? 'pointer' : 'default'};
	`}
`
