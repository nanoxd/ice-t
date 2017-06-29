import * as fs from 'fs'
import * as camelcase from 'camelcase'
import * as snakeCase from 'lodash.snakecase'

const CURRENT_DIRECTORY = process.cwd()

const BLACKLIST = ['node_modules']

export const isIncluded = (str: string, array: string[]) =>
  array.some(s => str.includes(s))

// TODO: Refactor to resolve path
export const createDirectory = (
  name: string,
  inDirectory = CURRENT_DIRECTORY
) => fs.mkdirSync(`${inDirectory}/${name}`)

export const copyContents = (templatePath: string, projectPath: string) => {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`

    const stat = fs.statSync(origFilePath)
    const directoryProjectPath = `${CURRENT_DIRECTORY}/${projectPath}`

    if (stat.isFile()) {
      const contents = readFile(origFilePath)

      console.log('Replacing strings')
      replaceWith(projectPath, contents)

      const writePath = `${directoryProjectPath}/${file}`
      console.log('Writing file: ', writePath)
      fs.writeFileSync(writePath, contents)
    } else if (stat.isDirectory()) {
      if (!isIncluded(file, BLACKLIST)) {
        fs.mkdirSync(`${directoryProjectPath}/${file}`)
        console.log('Creating directory: ', file)

        // Recurse
        copyContents(`${templatePath}/${file}`, `${projectPath}/${file}`)
      } else {
        return
      }
    }
  })
}

export const readFile = (filePath: string) => fs.readFileSync(filePath, 'utf8')
export const replaceTitle = (title: string, inFile: string) =>
  inFile.replace('__REPLACE_ME_TITLE__', title)
export const replaceCamelCase = (st: string, inFile: string) =>
  inFile.replace('__REPLACE_ME_CC__', camelcase(st))
export const replaceSnakeCase = (st: string, inFile: string) =>
  inFile.replace('__REPLACE_ME_SC__', snakeCase(st))

export const replaceWith = (string: string, inFile: string) => {
  replaceTitle(string, inFile)
  replaceCamelCase(string, inFile)
  replaceSnakeCase(string, inFile)
}

export const validateName = input => {
  if (/^([A-Za-z\-\_\d])+$/.test(input)) {
    return true
  } else {
    return 'Project name may only include letters, numbers, underscores and hashes.'
  }
}
