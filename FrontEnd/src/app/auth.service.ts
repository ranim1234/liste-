import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private add:WebRequestService) { } 
 
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
private RemoveSession(){

localStorage.removeItem('user-id') ; 
localStorage.removeItem('x-access-token');
localStorage.removeItem('x-refresh-token');
}



  authentifier(email:String,password:String){
return this.add.sign(email,password).pipe(
  shareReplay(),
  tap((res: HttpResponse<any>) => {
    // the auth tokens will be in the header of this response
    this.setSession(res.body._id, res.headers.get('x-access-token')|| '{}', res.headers.get('x-refresh-token')|| '{}');
    console.log("Successfully signed up and now logged in!");
  })
  )
} 
login(email:String,password:String){
return this.add.log(email,password).pipe(

  shareReplay(),
  tap((res: HttpResponse<any>) => {
    // the auth tokens will be in the header of this response
    this.setSession(res.body._id, res.headers.get('x-access-token')|| '{}', res.headers.get('x-refresh-token')|| '{}');
    console.log("Successfully  logged in!");
  })
)

} 

logout(){



 this.RemoveSession()  ;  
 console.log("Successfully  logged out!");
}



}
