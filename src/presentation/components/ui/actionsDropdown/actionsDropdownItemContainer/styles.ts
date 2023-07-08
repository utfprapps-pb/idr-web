import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 12px;
	gap: 12px;

	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.lightgray};
	}
`
