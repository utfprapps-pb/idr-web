import { colord } from 'colord'

type Props = {
	color: string
	percentage?: number
}

export const lighten = ({ color, percentage = 0.1 }: Props) =>
	colord(color).lighten(percentage).toHex()
