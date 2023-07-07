import { Trigger } from '@radix-ui/react-popover'
import styled from 'styled-components'

export const PopoverTrigger = styled(Trigger)`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	border-radius: 8px;
	padding: 0 12px;

	cursor: pointer;

	font-size: ${({ theme }) => theme.fontSizes.b3};
	font-weight: 500;

	height: 34px;
	background-color: ${({ theme }) => theme.colors.white};

	color: ${({ theme }) => theme.colors.text};
	box-shadow: inset 0px 4px 5px rgba(33, 1, 38, 0.03);

	&:hover {
		background-color: ${({ theme }) => theme.colors.lightgray};
	}

	&:focus {
		box-shadow: 0 0 0 0.5px ${({ theme }) => theme.colors.darkgray};
	}
`
