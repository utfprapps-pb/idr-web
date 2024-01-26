import 'styled-components'
import { ITheme } from '@/styles'

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention
	export interface DefaultTheme extends ITheme {}
}
