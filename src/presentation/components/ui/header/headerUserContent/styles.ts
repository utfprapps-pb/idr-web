import styled from 'styled-components'

export const UserContent = styled.div`
	display: flex;
	align-items: center;

	gap: 12px;
	padding: 8px 16px 8px 8px;

	border-radius: 48px;
	background-color: ${({ theme }) => theme.colors.background};
`
