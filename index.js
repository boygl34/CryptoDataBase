const express = require('express')
const bodyParser = require('body-parser')
const { init } = require('./db')
const routes = require('./routes')
const cors = require('cors'); 
const app = express()
app.use(bodyParser.json())
app.use(routes)
app.use(cors( { origin: '*' }));
init().then(() => {
  console.log('starting server on port 3000')
  app.listen(3000)
})
