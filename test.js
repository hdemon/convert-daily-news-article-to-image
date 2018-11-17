const scrape = require('./scrape.js')

scrape.execute()
    .then((result) => console.log(result))
