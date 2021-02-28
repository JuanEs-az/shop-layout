//Import del modelo
var Item = require('../models/items')
//Creación del controlador para los items
var itemController = {
    //Crear un item en la base (body:name,description,type,price,quantity,provider)
    //RUTA: /items/create  POST
    create:function(req,res){
        var item = new Item()
        var data = req.body
        item.name = data.name
        item.description = data.description
        item.type = data.type
        item.price = data.price
        item.quantity = data.quantity
        item.provider = data.provider
        item.save((err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,submitted:result})
            }
        })
    },
    //Obtener un item por su id (params:id)
    //RUTA: /items/get/:id  GET
    get: function(req,res){
        var id = req.params.id
        Item.findById(id,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }
        })
    },
    //Obtiene todos los productos (PARAMS: type,orderBy,reverse)
    //RUTA: /items/get/:type/:orderBy/:reverse
    getItems: function(req,res){
        let data = req.params
        order = {}
        order[data.orderBy.lower()] = data.reverse ? -1 : 1
        let search
        switch(data.type.capitalize()){
            case 'Product':
                search = Item.find({type:"Product"})
            break
            case 'Service':
                search = Item.find({type:"Service"})
            break
            default:
                search = Item.find({})
            break
        }   
        outcome.sort(order,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }
        })
    },
    //Actualizar item (params: id) (body:name,description,type,price,quantity,provider)
    //RUTA: /items/update/:id  PUT
    update: function(req,res){
        var data = req.body
        var id = req.params.id
        Item.findByIdAndUpdate(id,data,{new:true},(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,now:result})
            }
        })
    },
    //Disminuír o aumentar la cantidad de items disponibles (params: id) (body:increment)
    //RUTA: /items/update/:id/increment  PUT
    increment: function(req,res){
        var id = req.params.id
        var increment
        if(req.body.increment){
            increment = req.body.increment
        }else{
            increment = 0
        }
        Item.findById(id,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                var newQuantity = parseInt(result.quantity) + parseInt(increment)
                result.quantity = newQuantity
                Item.findByIdAndUpdate(id,result,{new:true},(err,result) => {
                    if(err){
                        return res.status(500)
                                  .send({error:true,type:500})
                    }else if(!result){
                        return res.status(404)
                                  .send({error:true,type:404})
                    }else{
                        return res.status(200)
                                  .send({error:false,now:result})
                    }
                })
            }
        })
    },
    //Subir la imagen de portada de un item a la base (params:id) (form-data: image)
    // RUTA: /items/uploadImage/:id POST
    uploadImage:function(req,res){
        var id = req.params.id
        if(req.files){
            var filePath = req.files.image.path
            console.log(filePath)
            var fileName = filePath.split('\\')[2]
            var ext = fileName.split('.')[1]
            if(ext == 'png' || ext == 'jpeg' || ext == 'jpg' || ext == 'gif'){
                Item.findByIdAndUpdate(id,{image:fileName},{new:true},(err,result) => {
                if(err){
                    return res.status(500)
                              .send({error:true,type:500})
                }else if(!result){
                    return res.status(404)
                              .send({error:true,type:404})
                }else{
                    return res.status(200)
                              .send({error:false,now:result})
                }
            })
            }else{ 
                fs.unlink(filePath, () => {
                   return res.status(500)
                             .send({error:true,type:500}) 
                })
            }
        }else{
            return res.status(404)
                      .send({error:true,type:404})
        }
    },
    //Eliminar un item (params:id)
    //RUTA: items/delete/:id  DELETE
    delete: function(req,res){
        var id = req.params.id
        Item.findByIdAndDelete(id,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,deleted:result})
            }
        })
    }
}
//Export del controlador
module.exports = itemController