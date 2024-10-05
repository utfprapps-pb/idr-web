export const yearValidation = (year: string) => {
	const yearAsNumber = Number(year)

	return yearAsNumber >= 1900 && yearAsNumber <= new Date().getFullYear()
}
