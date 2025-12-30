/* eslint-disable import/namespace */
import fs from 'fs'

import * as DataModules from './data/index.mjs'

const dir = './database'

const convertAndWriteJSON = (data, fileName) => {
  const jsonData = JSON.stringify(data, null, 2)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const jsonFilePath = `${dir}/${fileName}.json`
  fs.writeFileSync(jsonFilePath, jsonData)
  console.info(`Dados gerados ${jsonFilePath}\n`)
}

const getDependencies = (key) => {
  const baseName = key.replace('Data', '')

  const dependencyKey = `${baseName}Dependencies`

  const allExports = Object.keys(DataModules)
  if (!allExports.includes(dependencyKey)) {
    return []
  }

  const deps = DataModules[dependencyKey]

  if (!deps || !Array.isArray(deps)) {
    return []
  }

  return deps.map((dep) => `${dep}Data`)
}

const sortByDependencies = (modules) => {
  const sorted = []
  const visited = new Set()
  const visiting = new Set()

  const visit = (key) => {
    if (visited.has(key)) return
    if (visiting.has(key)) {
      throw new Error(`Dependência circular detectada em: ${key}`)
    }

    visiting.add(key)
    const dependencies = getDependencies(key)

    dependencies.forEach((depKey) => {
      if (modules[depKey]) {
        visit(depKey)
      }
    })

    visiting.delete(key)
    visited.add(key)
    sorted.push(key)
  }

  Object.keys(modules).forEach((key) => {
    if (key.endsWith('Data') && Array.isArray(modules[key])) {
      visit(key)
    }
  })

  return sorted
}

const sortedKeys = sortByDependencies(DataModules)
sortedKeys.forEach((key) => {
  const data = DataModules[key]
  if (Array.isArray(data)) {
    convertAndWriteJSON(data, key)
  }
})
