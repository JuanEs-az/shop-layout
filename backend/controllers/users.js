//Import del modelo
var User = require('../models/users')
var fs = require('fs')

//Creación del controlador para los usuarios
var userController = {
    // Crear un usuario en la base (body:name,nick,email,password)
    // RUTA: /users/create POST
    create:function(req,res){
        var user = new User()
        var data = req.body
        user.name = data.name
        user.nick = data.nick
        user.email = data.email
        user.password = data.password
        user.save((err,result) => {
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
    // Obtener un usuario por su email y contraseña (params:email,password)
    // RUTA: /users/join/:email/:password GET
    join:function(req,res){
        var data = req.params
        User.findOne({email:data.email,password:data.password},(err,result) => {
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
    // Obtener un usuario por su ID
    // RUTA: /users/get/:id 
    get:function(req,res){
        var id = req.params.id
        User.findById(id,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }})
    },
    //Actualizar un usuario por su id (body:name,nick,email,password) (params:id) 
    //RUTA: /users/update/:id PUT
    update:function(req,res){
        var data = req.body
        var id = req.params.id
        User.findByIdAndUpdate(id,data,{new:true},(err,result) => {
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
    //Eliminar un usuario (params:id)
    //RUTA: /users/delete/:id DELETE 
    delete:function(req,res){
        var id = req.params.id
        User.findByIdAndDelete(id,(err,result) => {
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
    },
    //Subir la imagen de perfil de un usuario a la base (params:id) (form-data: image)
    // RUTA: /users/uploadImage/:id POST
    uploadImage:function(req,res){
        var id = req.params.id
        if(req.files){
            var filePath = req.files.image.path
            console.log(filePath)
            var fileName = filePath.split('\\')[2]
            var ext = fileName.split('.')[1]
            if(ext == 'png' || ext == 'jpeg' || ext == 'jpg' || ext == 'gif'){
                User.findByIdAndUpdate(id,{image:fileName},{new:true},(err,result) => {
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
    }
}
//Export del controlador
module.exports = userController