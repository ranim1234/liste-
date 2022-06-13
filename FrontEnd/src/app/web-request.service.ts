import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
readonly url ; 
constructor( private http:HttpClient) {

this.url = "http://localhost:3400" ; 

 } 
 log(email:String,password:String){
  return this.http.post(`${this.url}/on`,{email,password},{observe:'response'})
  
    
  
  }


sign(email:String,password:String){
 return this.http.post(`${this.url}/users`,{email,password},{observe:'response'}) ; 


} 

}
