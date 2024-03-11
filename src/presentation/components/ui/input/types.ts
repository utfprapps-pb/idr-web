export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	mask?: (value: string) => string
}
