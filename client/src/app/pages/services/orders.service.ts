import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:3005';

  constructor(private http: HttpClient) {}

  getOrderDetails(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/order/${customerId}`;
    return this.http.get<any>(url);
  }
}
