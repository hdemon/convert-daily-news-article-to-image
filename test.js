const scrape = require('./scrape.js')

scrape.handler()
    .then((result) => console.log(result))
