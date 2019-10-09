const flash = require('express-flash');
const session = require('express-session');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')


const pg = require('pg');
const Pool = pg.Pool;



var greetings = require('./greetFact')
var routings = require('./greet-route')

const setFact = greetings()
const routingFact = routings(setFact)
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret : 'this is my long string that is used for session in http',
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/', routingFact.indexs)

app.post('/greet', routingFact.postData)

app.get('/greeted',routingFact.getAction)


var PORT = process.env.PORT || 5006

app.listen(PORT, function () {
    console.log('server', PORT)
})