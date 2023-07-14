import styled from 'styled-components'

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	width: max-content;

	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`
