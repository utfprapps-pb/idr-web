import fs from 'fs'

import * as DataModules from './data/index.mjs'

const dir = './database'
const databaseKeys = []

const convertAndWriteJSON = (data, fileName) => {
	const jsonData = JSON.stringify(data, null, 2)

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}

	const jsonFilePath = `${dir}/${fileName}.json`
	fs.writeFileSync(jsonFilePath, jsonData)
	console.info(`Dados gerados ${jsonFilePath}\n`)
}

for (const [key, data] of Object.entries(DataModules)) {
	if (Array.isArray(data)) {
		databaseKeys.push(key)
		convertAndWriteJSON(data, key)
	}
}
