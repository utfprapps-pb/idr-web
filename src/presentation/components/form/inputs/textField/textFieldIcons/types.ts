export type Props = {
	position: 'left' | 'right'
	isWithError?: boolean
}

export type ContainerProps = Props & {
	hasError: boolean
}
