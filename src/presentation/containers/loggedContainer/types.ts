import { CSSProperties, PropsWithChildren } from 'react'

import { ClassValue } from 'clsx'

type SectionProps = React.HTMLAttributes<HTMLDivElement>

export type LoggedContainerProps = PropsWithChildren<SectionProps>

export type StylesProps = {
	inline: CSSProperties
	className: ClassValue[]
}
