import * as fs from 'fs'

const CURRENT_DIRECTORY = process.cwd()

const BLACKLIST = ['node_modules']

export const isIncluded = (s: string, array: string[]) => array.some(s.includes)

// TODO: Refactor to resolve path
export const createDirectory = (name: string, inDirectory = CURRENT_DIRECTORY) =>
  fs.mkdirSync(`${inDirectory}/${name}`)

export const copyContents = (templatePath: string, projectPath: string) => {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`

    const stat = fs.statSync(origFilePath)
    const directoryProjectPath = `${CURRENT_DIRECTORY}/${projectPath}`

    if (stat.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      console.log('Writing File: ', file)

      const writePath = `${directoryProjectPath}/${file}`
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

export const validateName = input => {
  if (/^([A-Za-z\-\_\d])+$/.test(input)) {
    return true
  } else {
    return 'Project name may only include letters, numbers, underscores and hashes.'
  }
}
