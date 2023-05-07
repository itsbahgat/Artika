import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerAdminService {
  baseUrl = "http://localhost:3005/";
  constructor(private http: HttpClient) {}
  gettAllCutomers() {
    return this.http.get(this.baseUrl + "customers/all");
  }

  deleteCustomerById(id: any) {
    console.log("in delete service...", id);
    return this.http.delete(this.baseUrl + "customers/" + id);
  }

  getAllProducts() {
    return this.http.get(this.baseUrl + "api/product");
  }

  getAllCarts() {
    return this.http.get(this.baseUrl + "cart");
  }
  getAllOrderes() {
    return this.http.get(this.baseUrl + "order");
  }
}
