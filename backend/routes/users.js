//Import de express y del controlador
var express = require('express')
var controller = require('../controllers/users')
var connectMultiparty = require('connect-multiparty')
const multipart = require('connect-multiparty')
//Declaramos un router
var router = express.Router()
//Middlewares
var middleware = {
    forImages:connectMultiparty({uploadDir:'./uploads/profiles'})
}
//Creación de rutas
router.post('/create',controller.create) //Crear usuarios 
router.post('/uploadImage/:id',middleware.forImages,controller.uploadImage) //Actualizar la imagen de perfil
router.get('/join/:email/:password',controller.join) //Obtener un usuario por su email y password
router.get('/get/:id',controller.get)
router.put('/update/:id',controller.update)//Actualizar los datos de un usuario
router.delete('/delete/:id',controller.delete)//Eliminar usuarios
//Export del router
module.exports = router