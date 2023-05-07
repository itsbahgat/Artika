import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:3005";
  private tokenKey = "token";

  constructor(private http: HttpClient) {}

  login(emailOrUsername: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { emailOrUsername, password };
    return this.http.post(url, body).pipe(
      tap((response) => {
        // save user's information in local storage
        localStorage.setItem("user", JSON.stringify(response));
      })
    );
  }

  getProperty(property: string): string | null {
    const userString = localStorage.getItem("token");
    if (userString) {
      const user = JSON.parse(userString);
      return user[property] || null;
    }
    return null;
  }

  register(user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
    address: string;
    phone: string;
  }): Observable<any> {
    console.log("user");
    console.log(user);
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }

  userLoggedIn(): boolean {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return !!user;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("user");
  }
}
