import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = 'http://localhost:3005'; // Update the base URL accordingly

  constructor(private http: HttpClient) {}

  updateOrders(orders: any[]): Observable<any> {
    const url = `${this.baseUrl}/seller/update-orders`;
    return this.http.post(url, orders);
  }
}
