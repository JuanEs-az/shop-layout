//Imports
var mongoose = require('mongoose')
//Creamos el esquema con mongoose y a partir de este generamos nuestro modelo
var Schema = mongoose.Schema
var itemSchema = Schema({
    name:String,
    description:String,
    type:String,
    price:Number,
    quantity:Number,
    provider:String,
    date:{
        type:Date,
        default:Date.now,
    },
    image:String
})
module.exports = mongoose.model('items',itemSchema)