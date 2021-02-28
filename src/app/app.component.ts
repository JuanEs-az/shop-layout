import { Component,OnInit } from '@angular/core';
import { UserService } from './services/users.service'
import { WindowRef } from './services/window.service'
@Component({
  selector: 'app-root',
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //Usar el objeto window para guardar la variable de forma global en window.user
  public user:any
  private _wd:any
  constructor(private _userService:UserService,private _windowService:WindowRef){
    this._wd = _windowService.nativeWindow
  }
  ngOnInit(){
    if(localStorage.getItem("id") && !this._wd.user){
      this._userService.getUser({_id:localStorage.getItem("id")}).subscribe(
      (result) => {
        this._wd.user = result.got
        this.user = this._wd.user
      },
      (err) => {
        localStorage.removeItem("id")
        console.clear()
      })
    }
  }
}
