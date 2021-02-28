import { Injectable } from '@angular/core'
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Global } from './global.service'
@Injectable()
export class UserService{
    public url:string
   
    constructor(private _http:HttpClient){
        this.url = Global.url + "users/"
    }
    //Va a tomar un objeto con name,nick,email,password como atributos y los va a subir a la base
    saveUser(data:any):Observable<any>{
        let json = JSON.stringify(data)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url + "create",json,{headers:headers})
    }
    //Toma un objeto json con un email y password y obtiene el usuario con quien coincida
    joinUser(data:any):Observable<any>{
        return this._http.get(this.url + `join/${data.email}/${data.password}`)
    }
    getUser(data:any):Observable<any>{
        return this._http.get(this.url + `get/${data._id}`)
    }
    //Toma un arreglo con name,nick,email,password y id, para pasarle esta ultima por params y actualizar el usuario con los datos del body
    updateUser(data:any):Observable<any>{
        let json = JSON.stringify(data)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url + `update/${data.id}`,json,{headers:headers})
    }
    //Elimina un elemento según su ID
    deleteUser(data:any):Observable<any>{
        return this._http.delete(this.url + `delete/${data.id}`)
    }
    //Actualiza la imagen de un usuario según su ID, y además le pasamos los archivos
    uploadUserImage(data:any,files:Array<File>,name:string){
        return new Promise((resolve,reject) => {
            var formData:any = new FormData()
            var xhr = new XMLHttpRequest()
            for(let i = 0; i < files.length;i++){
                formData.append(name,files[i],files[i].name)
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('POST',this.url + `uploadImage/${data._id}`,true)
            xhr.send(formData)
        })
    }
}
