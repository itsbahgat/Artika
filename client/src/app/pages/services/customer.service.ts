import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:3005/customers';

  constructor(private http: HttpClient) { }

  getCustomerById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getUsernameById(id: string): Observable<string> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((customer: any) => customer.username)
    );
  }
}