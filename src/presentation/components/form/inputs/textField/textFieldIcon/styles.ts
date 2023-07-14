import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	color: ${({ theme }) => theme.colors.darkgray};
	font-size: ${({ theme }) => theme.fontSizes.b2};
`
