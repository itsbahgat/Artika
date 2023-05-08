import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly BASE_URL = "http://localhost:3005/api/product";

  constructor(private http: HttpClient) {}

  getProductsByCategory(categories: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/category/${categories}`);
  }
}
