const express = require('express')
const PORT = 9000
var bodyParser = require('body-parser')

// creating our express app
const app = express()

app.set('view engine', 'ejs')

app.use( express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static(__dirname + '/public'));


// route
const routes = require('./routes/Route')
app.use('/', routes)

//start server
app.listen(PORT, ()=>{
    console.log("Listening on port: " + PORT)
}) 