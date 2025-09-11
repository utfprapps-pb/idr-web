import { useEffect, useState } from 'react'

function getCurrentWidthAndHeight() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export function useWindowResize() {
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
