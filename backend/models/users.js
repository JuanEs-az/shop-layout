//Imports
var mongoose = require('mongoose')
//Creamos el esquema con mongoose y a partir de este generamos nuestro modelo
var Schema = mongoose.Schema
var userSchema = Schema({
    name:String,
    nick:String,
    email:String,
    password:String,
    image:String,
})
module.exports = mongoose.model('users',userSchema)