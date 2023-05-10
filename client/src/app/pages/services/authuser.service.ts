import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3005';
  private tokenKey = 'tokenuser';


  constructor(private http: HttpClient) { }

  login(emailOrUsername: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { emailOrUsername, password };
    return this.http.post(url, body).pipe(
      tap((response) => {
        // save user's information in local storage
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
}

getProperty(property: string): string | null {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user[property] || null;
  }
  return null;
}

  register(user: {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    role: string,
    address: string,
    phone: string,
    avatar:File
  }): Observable<any> {
    console.log("user in service");
    console.log(user);
    var formData = new FormData();
    for ( var key in user ) {
        formData.append(key, user[key]);
    }
    
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, formData);
  }

  userLoggedIn(): boolean {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return !!user;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
  
  
  

}
