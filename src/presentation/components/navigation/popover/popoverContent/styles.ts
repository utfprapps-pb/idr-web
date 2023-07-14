import { Content } from '@radix-ui/react-popover'
import styled from 'styled-components'

export const PopoverContent = styled(Content)`
	border-radius: 8px;

	width: max-content;

	font-size: ${({ theme }) => theme.fontSizes.b3};
	color: ${({ theme }) => theme.colors.text};
	background-color: ${({ theme }) => theme.colors.white};

	box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
`
