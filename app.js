const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(path.join(__dirname, 'views/partials'))

// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index'))
app.get('/beers', (req, res) => {
  
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi })
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error))
  
  
})
app.get('/randomBeer', (req, res) => {

  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randomBeer', { randomBeer: responseFromAPI[0] })
      console.log('randomBeers from the database:', responseFromAPI);
    })
    .catch(error => console.log(error));
});

app.listen(3009, () => console.log('🏃‍ on port 3009'))



