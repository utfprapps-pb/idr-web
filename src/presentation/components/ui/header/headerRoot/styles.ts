import styled from 'styled-components'

export const Header = styled.header`
	grid-area: Header;
	background-color: ${({ theme }) => theme.colors.white};

	display: flex;
	align-items: center;
	justify-content: flex-end;

	padding: 24px 34px;
`
