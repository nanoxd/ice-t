const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")

const templatesPath = path.resolve(process.env.HOME, "templates")
const choices = fs.readdirSync(templatesPath)

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What template would you like to generate?",
    choices
  }
]

inquirer.prompt(QUESTIONS)
    .then(console.log)
    .catch(console.log)