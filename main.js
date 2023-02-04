var express = require('express')

var app = express()

app.listen(8080, function () {
	console.log("start!");
})

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/private', function(req,res) {
    res.sendFile(__dirname + "/public/private.html")
})

app.use('/public', express.static(__dirname + '/public'));