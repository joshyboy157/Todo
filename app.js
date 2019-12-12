var express = require('express');
var Controller = require('./controller/controller');

var app = express();


// template engine

app.set('view engine', 'ejs');


//static files, will search public folder for staic files
app.use(express.static('./public'));

//fires the controller
Controller(app);


//listen to port 4000
app.listen(4000);
console.log("listening to port 4000");