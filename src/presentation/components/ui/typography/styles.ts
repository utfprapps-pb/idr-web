import styled from 'styled-components'

import { ITheme } from '@/styles/themes'

export const Text = styled.div<{
	color: keyof ITheme['colors']
	weight: keyof ITheme['fontWeights']
	size: keyof ITheme['fontSizes']
	family: keyof ITheme['fontFamily']
	hasOnClick?: boolean
}>`
	color: ${(props) => props.theme.colors[props.color]};

	font-weight: ${(props) => props.theme.fontWeights[props.weight]};
	font-size: ${(props) => props.theme.fontSizes[props.size]};
	font-family: ${(props) => props.theme.fontFamily[props.family]}, sans-serif;

	cursor: ${(props) => (props.hasOnClick ? 'pointer' : 'default')};
`
