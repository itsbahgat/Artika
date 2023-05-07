import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthadminService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post("http://localhost:3005/admin/login", data);
  }

  saveToken(token: any) {
    localStorage.setItem("jwt", token);
  }

  adminLoggedIn() {
    if (!localStorage.getItem("jwt")) {
      return false;
    }
    let token: any = localStorage.getItem("jwt");
    let decodeToken = this.helper.decodeToken(token);

    //  if(decodeToken.role){
    //    return false
    //  }

    if (this.helper.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  getUserName() {
    let token: any = localStorage.getItem("jwt");
    let decodeToken = this.helper.decodeToken(token);
    let userName = "name";
    userName = decodeToken.userName;
    return userName;
  }
}
