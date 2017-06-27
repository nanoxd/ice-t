#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'
import * as inquirer from 'inquirer'
import { createDirectory, copyContents, validateName } from './templater'

const templatesPath = path.resolve(process.env.HOME, "templates")
// TODO: Ignores first two items
const choices = fs.readdirSync(templatesPath).slice(2)

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

const pathForTemplate = name =>
  `${templatesPath}/${name}`

inquirer.prompt(QUESTIONS)
    .then(answers => {
      const { template, name } = answers

      createDirectory(name)
      copyContents(pathForTemplate(template), name)
    })
    .catch(console.log)
