import { CSSProperties, PropsWithChildren } from 'react'

type SectionProps = React.HTMLAttributes<HTMLDivElement>

export type LoggedContainerProps = PropsWithChildren<SectionProps>

export type StylesProps = {
  inline: CSSProperties
  className: string
}
