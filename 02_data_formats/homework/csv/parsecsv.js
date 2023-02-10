const csv = require('csv-parser')
//remember install parser
const fs = require('fs')
const results = [];

fs.createReadStream('me.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);

  });