import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getOrderDetails(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/order/${customerId}`;
    return this.http.get<any>(url);
  }

  getOrderDetailsForSellers(sellerID: string): Observable<any> {
    const url = `${this.baseUrl}/seller/${sellerID}`;
    return this.http.get<any>(url);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const url = `${this.baseUrl}/order`;
    const body = {
      orderId: orderId,
      status: status
    };
    return this.http.put<any>(url, body);
  }

  cancelOrder(orderId: string): Observable<any> {
    const status = 'cancelled';
    return this.updateOrderStatus(orderId, status);
  }
  
}
