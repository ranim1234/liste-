import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule, Routes } from "@angular/router"; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private onLogin : AuthService) { }

  ngOnInit(): void {
  }

create(email:String,password:String){



this.onLogin.login(email,password).subscribe((res:HttpResponse<any>)=>{


console.log(res) ; 



})



}

}
