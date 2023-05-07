import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { product } from "src/app/data-type";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}
  addProduct(product: product) {
    return this.http.post("http://localhost:3005/api/product/", product);
  }
}
