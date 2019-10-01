const flash = require('express-flash');
const session = require('express-session');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var greetings = require('./greetFact')
const setFact = greetings()

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {
        counting: setFact.count(),
        greet: setFact.displayer(req.body.langItemType)
    })
})

app.post('/greet', function (req, res) {

    setFact.storedNames(req.body.namesUpdate);
    setFact.greetName(req.body.langItemType)
  

    res.redirect('/')

})

app.get('/greeted',function(req,res){
    res.render('greeted',{actions:setFact.nameList()})
    console.log(setFact.output())
})



var PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log('server', PORT)
})