const fs = require('fs')

const CURRENT_DIRECTORY = process.cwd()

// TODO: Refactor to resolve path
const createDirectory = (name, inDirectory = CURRENT_DIRECTORY) =>
  fs.mkdirSync(`${inDirectory}/${name}`)

const copyContents = (templatePath, projectPath) => {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`

    const stat = fs.statSync(origFilePath)
    const directoryProjectPath = `${CURRENT_DIRECTORY}/${projectPath}`

    if (stat.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      console.log('Writing File: ', file)

      const writePath = `${directoryProjectPath}/${file}`
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stat.isDirectory()) {
      fs.mkdirSync(`${directoryProjectPath}/${file}`)
      console.log('Creating directory: ', file)

      // Recurse
      copyContents(`${templatePath}/${file}`, `${projectPath}/${file}`)
    }
  })
}

module.exports = {
  copyContents,
  createDirectory
}