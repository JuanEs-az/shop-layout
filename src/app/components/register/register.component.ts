import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/users.service'
import { WindowRef } from '../../services/window.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  public userR:any
  public files:Array<File>
  private _wd:any
  /*Declaramos un valor para nuestro objeto usuario que enviaremos por POST
  Además tremos el servicio de peticiones para los usuario al backend _userService
  Y el router para redireccionar al inicio _router*/
  constructor(private _userService:UserService,private _router:Router,private _windowService:WindowRef) {
    this.userR = {
      name : "",
      nick : "",
      email : "",
      password : ""
    }
    this._wd = this._windowService.nativeWindow
  }
  //Organizamos un evento de cambio para el archivo de la foto de perfil y así actualizarlo
  fileChange(event:any){
    this.files = <Array<File>>event.target.files
  }
  ngOnInit():void{
    //Si al ser recargada la pagina ya hay usuario volverá al inicio
    if(this._wd.user){
      this._router.navigate(['profile'])
    }
  }
  onSubmit(): void{
    this._userService.saveUser(this.userR).subscribe(
      (response) => {
        //Subimos la imagen si hay
        if(this.files){
          this._userService.uploadUserImage(response.submitted,this.files,'image')
          .then((result) => {

          })
          .catch((err) => {

          })
        }
        //Guardar ID en el localStorage para tener el usuario de manera global
          localStorage.setItem('id',response.submitted._id)
          this._wd.user = response.submitted
          //Recargar la pagina
          this._wd.location.reload()
      },
      (error) => {

      }
    )
  }
}
