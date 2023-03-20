import { colord } from 'colord'

type Props = {
	color: string
	percentage?: number
}

export const darken = ({ color, percentage = 0.1 }: Props) =>
	colord(color).darken(percentage).toHex()
