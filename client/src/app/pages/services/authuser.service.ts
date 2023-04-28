import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  helper = new JwtHelperService()

  constructor(private http:HttpClient) { }


  login(data:any) {
    return this.http.post('http://localhost:3005/login',data)
  }

  saveToken(token: any) {
    localStorage.setItem('tokenuser', token);
  }


  userLoggedIn(){

    if(!localStorage.getItem('tokenuser')){
      return false
    }
    let token:any=localStorage.getItem('tokenuser')
    let decodeToken=this.helper.decodeToken(token)




     if(decodeToken.role){
       return false
     }

     if(this.helper.isTokenExpired(token)){
       return false
     }

     return true


  }
  getUserName() {
    let token:any=localStorage.getItem('tokenuser')
    let decodeToken=this.helper.decodeToken(token)
    let userName = "name"
    userName = decodeToken.userName
    return userName
  }

  
  //User Register
  register(body: any) {
    console.log(typeof body.birth);
    return this.http.post('http://localhost:3005/register', body);
  }

}
