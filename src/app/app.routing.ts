//Imports
import { ModuleWithProviders } from '@angulaR/core'
import { Routes , RouterModule } from '@angular/router'
//Components
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
//Rutas
const appRoutes:Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'profile',component:ProfileComponent,
    children: [
        {path:'**',component:ErrorComponent}
    ]},
    {path:'**',component:ErrorComponent}
]
//Export del import y provider de las rutas
export const appRoutingProviders:any[] = []
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)