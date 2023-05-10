import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthadminService {
  helper = new JwtHelperService();
  private baseUrl = "http://localhost:3005";
  private tokenKey = "user";

  constructor(private http: HttpClient) {}

  // login(data: any) {
  //   return this.http.post("http://localhost:3005/admin/login", data);
  // }
  login(emailOrUsername: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/admin/login`;
    const body = { emailOrUsername, password };
    return this.http.post(url, body).pipe(
      tap((response) => {
        // save user's information in local storage
        localStorage.setItem("user", JSON.stringify(response));
      })
    );
  }
  saveToken(token: any) {
    localStorage.setItem("user", token);
  }

  adminLoggedIn() {
    if (!localStorage.getItem("jwt")) {
      return false;
    }
    let token: any = localStorage.getItem("jwt");
    let decodeToken = this.helper.decodeToken(token);
    console.log(decodeToken);

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
    console.log("admin getUserName()", decodeToken);
    userName = decodeToken.userName;
    return userName;
  }
  getProperty(property: string): string | null {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user[property] || null;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem("jwt");
  }
}
