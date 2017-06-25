const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")

const templatesPath = path.resolve(process.env.HOME, "templates")
const choices = fs.readdirSync(templatesPath)

const validateName = input => {
  if (/^([A-Za-z\-\_\d])+$/.test(input)) {
    return true
  } else {
    return 'Project name may only include letters, numbers, underscores and hashes.'
  }
}

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What template would you like to generate?",
    choices
  },
  {
    name: "name",
    message: "Project Name",
    validate: validateName
  }
]

inquirer.prompt(QUESTIONS)
    .then(console.log)
    .catch(console.log)