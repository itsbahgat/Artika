import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerAdminService {
  baseUrl = "http://localhost:3005/";
  constructor(private http: HttpClient) {}
  //for customers ......
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
  //////////////////

  // for seller .........
  getAllSellers() {
    return this.http.get(this.baseUrl + "sellers/all");
  }

  getAllPendingSellers() {
    return this.http.get(this.baseUrl + "sellers/allpending");
  }

  deleteSellerById(id: any) {
    return this.http.delete(this.baseUrl + "sellers/" + id);
  }

  sellerApprove(id: any) {
    return this.http.put(this.baseUrl + "sellers/sellerapprove/" + id, {});
  }
}
