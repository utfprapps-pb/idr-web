import axios from 'axios'

export const uiAvatarsApi = axios.create({
	baseURL: 'https://ui-avatars.com/api/',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})
