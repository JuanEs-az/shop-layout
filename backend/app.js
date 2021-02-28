//Imports
var express = require('express')
var bodyParser = require('body-parser')

//Definimos nuestra app
var app = express()

//Configuración e importación de rutas
var usersRoutes = require('./routes/users') //Import de la ruta de usuarios
var itemsRoutes = require('./routes/items') //Import de la ruta de items
//Middlewares
app.use(bodyParser.urlencoded({extended:false})) //Configuración necesaria del bodyparser
app.use(bodyParser.json()) //Conversor de peticiónes a JSON

//Configuración del CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargado de rutas
app.use('/users',usersRoutes) //Cargado de las rutas de usuarios
app.use('/items',itemsRoutes) //Cargado de las rutas de items 
//Export de nuestra app
module.exports = app
