import { useEffect, useState } from 'react'

type ResizeProps = {
	width: number
	height: number
}

const getCurrentWidthAndHeight = (): ResizeProps => ({
	width: window.innerWidth,
	height: window.innerHeight
})

export const useWindowResize = () => {
	const [widthAndHeight, setWidthAndHeight] = useState(
		getCurrentWidthAndHeight()
	)

	const handler = () => {
		setWidthAndHeight(getCurrentWidthAndHeight())
	}

	useEffect(() => {
		window.addEventListener('resize', handler)
		return () => window.removeEventListener('resize', handler)
	})

	return widthAndHeight
}
