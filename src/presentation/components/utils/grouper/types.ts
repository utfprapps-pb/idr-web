import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

type SectionProps = ComponentPropsWithoutRef<'section'>

export type GrouperProps = PropsWithChildren<SectionProps>
