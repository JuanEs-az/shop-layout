import { Injectable } from '@angular/core'
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Global } from './global.service'
@Injectable()
export class ItemService{
    public url:string
   
    constructor(private _http:HttpClient){
        this.url = Global.url + "items/"
    }
    //Va a guardar un item usando un objeto json con name,description,type,price,quantity,provider
    saveItem(data:any):Observable<any>{
        let json = JSON.stringify(data)
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.post(this.url + "create",json,{headers:headers})
    }   
    //Obtiene un elemento según el id que le pasemos en el objeto
    getItem(data:any):Observable<any>{
        return this._http.get(this.url + `get/${data.id}`)
    }
    //Hace una petición para actualizar el objeto con el id correspondiente según el body
    updateItem(data:any):Observable<any>{
        let json = JSON.stringify(data)
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.put(this.url + `update/${data.id}`,json,{headers:headers})
    }   
    //Incrementa la cantidad de elementos que hay en el stock {increment:x} suma x
    increment(data:any):Observable<any>{
        let json = JSON.stringify(data)
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.put(this.url + `update/${data.id}/increment`,json,{headers:headers})
    }
    //Elimina un elemento según su id
    deleteItem(data:any):Observable<any>{
        return this._http.delete(this.url + `delete/${data.id}`)
    }
    //Obtiene una lista de elemntos {type:Product,Service o null,orderBy:propiedad del modelo,reverse:true o false}
    getItems(data:any){
        return this._http.get(this.url + `get/${data.type}/${data.orderBy}/${data.reverse}`)
    }
    //Actualiza la imagen de un item
    updateItemImage(data:any,files:Array<File>,name:string){
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
            xhr.open('POST',this.url + `uploadImage/${data.id}`,true)
            xhr.send(formData)
        })
    }
}
