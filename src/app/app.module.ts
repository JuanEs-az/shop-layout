//Imports
//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
//  Routes config
import { routing , appRoutingProviders } from './app.routing'
//Services
import { WindowRef } from './services/window.service'
//  Main Component
import { AppComponent } from './app.component';
//Componentes
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
//App Class Module Export
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders,
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
