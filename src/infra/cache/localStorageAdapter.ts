export class LocalStorageAdapter {
	static readonly LOCAL_STORAGE_KEYS = {
		AUTH: 'auth'
	}

	static get(key: string): string | null {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : null
	}

	static set(key: string, value?: object): void {
		if (value) {
			localStorage.setItem(key, JSON.stringify(value))
			return
		}

		localStorage.removeItem(key)
	}
}
