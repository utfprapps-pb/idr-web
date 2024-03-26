export type UserModel = {
	token: string
}

export type CreateUserModel = {
	name: string
	email: string
	password: string
	confirmPassword: string
	cpf: string
	phone: string
	graduationYear: string
	professionalRegister: string
	cep: string
	street: string
	city: string
	houseNumber: string
}

export type UserInfoModel = {
	name: string
}
