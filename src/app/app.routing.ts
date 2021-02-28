//Imports
import { ModuleWithProviders } from '@angulaR/core'
import { Routes , RouterModule } from '@angular/router'
//Components
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
//Rutas
const appRoutes:Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'**',component:ErrorComponent}
]
//Export del import y provider de las rutas
export const appRoutingProviders:any[] = []
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)