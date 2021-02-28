import { Component } from '@angular/core';
import { UserService } from '../../services/users.service'
import { WindowRef } from '../../services/window.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UserService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  public userL:any
  public err:any
  private _wd:any
  constructor(private _userService:UserService,private _router:Router,private _windowService:WindowRef){
    this.userL = {
      email : "",
      password: ""
    }
    this._wd = _windowService.nativeWindow
  }
  onSubmit(){
    this._userService.joinUser(this.userL).subscribe(
      (result) => {
        //Guardar ID en el localStorage para tener el usuario de manera global
        localStorage.setItem('id',result.got._id)
        this._wd.user = result.got
        //Recargar
        this._wd.location.reload()
        //Redirigir a Inicio
        this._router.navigate([''])
      },
      (error) => {
        console.error("Error " + error.type)
        this.err = true
      })
  }


}
