//Imports
var mongoose = require('mongoose')
var app = require('./app')
//Conección con la base de mongo
var port = 9930
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/shoplayout',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => {
        //Esto se ejecuta al conectar con la base
        console.log('Conexión con la base establecida')
        //Creación y Conexión con el servidor
        app.listen(port,() => {
            console.log('Servidor corriendo en puerto ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })