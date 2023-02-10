const fs = require('fs')
const YAML = require('yaml')

const file = fs.readFileSync('me.yml', 'utf8')
YAML.parse(file)
console.log(file)