import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private sign : AuthService) { }

  ngOnInit(): void {
  }

create(email:String,password:String)  {

this.sign.authentifier(email,password).subscribe((res:HttpResponse<any>)=>{



  console.log(res) ; 


})

}

}
