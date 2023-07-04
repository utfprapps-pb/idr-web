import styled from 'styled-components'

export const Sidebar = styled.aside`
	grid-area: Sidebar;
	position: fixed;
	top: 0;
	left: 0;

	height: 100vh;
	width: 320px;

	background-color: ${({ theme }) => theme.colors.white};
`
