import styled from 'styled-components'

export const Header = styled.header`
	grid-area: Header;
	background-color: ${({ theme }) => theme.colors.white};

	display: flex;
	align-items: center;
	justify-content: flex-end;

	padding: 24px 34px;
`

export const UserContent = styled.div`
	display: flex;
	align-items: center;

	gap: 12px;
	padding: 8px;

	border-radius: 48px;
	background-color: ${({ theme }) => theme.colors.background};
`

export const UserPhoto = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`
