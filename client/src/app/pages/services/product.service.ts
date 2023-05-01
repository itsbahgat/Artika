import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BASE_URL = 'http://localhost:3005/api/product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${product._id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }

}
