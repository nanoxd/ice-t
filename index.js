const fs = require('fs')
const path = require('path')

const templatesPath = path.resolve(process.env.HOME, 'templates')
const CHOICES = fs.readdirSync(templatesPath)