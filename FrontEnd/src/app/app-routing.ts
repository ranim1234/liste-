import { RouterModule, Routes } from "@angular/router"; 
import { ListeComponent } from "./liste/liste.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";



const routing : Routes = [
    { path:'' , component:SignupComponent} , 
    {path:'list' , component:ListeComponent} , 

    { path:'login' , component:LoginComponent} 








] 
 export const ROUTING = RouterModule.forRoot(routing) ; 