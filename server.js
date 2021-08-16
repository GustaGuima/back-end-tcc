const {createServer} = require('http')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const db = require('./database/db')
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
var Exercicios = require('./routes/Exercicios')
const { create } = require('domain')

app.use('/users', Users)
app.use('/exercicio', Exercicios)

const server = createServer(app)



server.listen(port, err => {
  if(err) throw err

  console.log('Server is running on port: ' + port)

})