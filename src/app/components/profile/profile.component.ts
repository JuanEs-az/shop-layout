import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../../services/window.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private _wd:any
  constructor(private _router:Router,private _windowService:WindowRef) {
    this._wd = this._windowService.nativeWindow
  }

  ngOnInit(): void {
    if(!this._wd.user){
      this._router.navigate(['profile'])
    }
  }
  logout(){
    this._wd.user = undefined
    localStorage.removeItem("id")
    this._wd.location.reload()
  }

}
