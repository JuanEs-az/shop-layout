//Import de express y del controlador
var express = require('express')
var controller = require('../controllers/items')
var connectMultiparty = require('connect-multiparty')
//Declaramos un router
var router = express.Router()
//Middlewares
var middleware = {
    forImages:connectMultiparty({uploadDir:'./uploads/items'})
}
//Creación de rutas
router.post('/create',controller.create) //Crear un item
router.post('/uploadImage/:id',middleware.forImages,controller.uploadImage) //Para actualizar la imagen del item
router.get('/get/:id',controller.get)//Obtener un item por su id
router.get('/get/:type/:orderBy/:reverse',controller.getItems)//Obtiene todos los productos
router.put('/update/:id',controller.update) //Actualizar un item
router.put('/update/:id/increment',controller.increment) //Disminuye o aumenta la cantidad de items disponibles
router.delete('/delete/:id',controller.delete) //Permite eliminar un producto
//Export del router
module.exports = router