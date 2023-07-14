import styled from 'styled-components'

import { Theme } from '@/styles/themes'

export const Text = styled.div<{
	color: keyof Theme['colors']
	weight: keyof Theme['fontWeights']
	size: keyof Theme['fontSizes']
	family: keyof Theme['fontFamily']
	hasOnClick?: boolean
}>`
	color: ${(props) => props.theme.colors[props.color]};

	font-weight: ${(props) => props.theme.fontWeights[props.weight]};
	font-size: ${(props) => props.theme.fontSizes[props.size]};
	font-family: ${(props) => props.theme.fontFamily[props.family]}, sans-serif;

	cursor: ${(props) => (props.hasOnClick ? 'pointer' : 'default')};
`
