var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://Test:Todo@cluster0-nanqm.mongodb.net/test?retryWrites=true&w=majority');

// Schema
var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo', todoSchema);


var data = [{item: "eat milk"}, {item:"eat dog"}];
var urlencodedParser = bodyParser.urlencoded({extended: false });


//exports module to use in app.js

module.exports = function(app){



app.get('/todo',function(req,res){
    // get data from database
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render("todo",{todos:data});
    });
  
});

app.post('/todo', urlencodedParser,function(req,res){
    // add item to database
var newTodo = Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
});

});

app.delete('/todo/:item',function(req,res){
    // delete item from database
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
})

}