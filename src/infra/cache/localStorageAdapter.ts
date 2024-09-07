export class LocalStorageAdapter {
	static readonly LOCAL_STORAGE_KEYS = {
		AUTH: 'auth'
	}

	static get(key: string): string | null {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : null
	}

	static set<T>(key: string, value?: T): void {
		if (value) {
			localStorage.setItem(
				key,
				typeof value === 'object' ? JSON.stringify(value) : String(value)
			)
			return
		}

		localStorage.removeItem(key)
	}
}
