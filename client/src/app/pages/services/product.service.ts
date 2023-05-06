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

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }

  getProductsByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/title/${title}`);
  }

  getProductsByCategory(categories: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/category/${categories}`);
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

  submitProductReview(
    productId: string,
    user: string,
    rating: number,
    comment: string
  ): Observable<any> {
    if (rating < 1 || rating > 5) {
      return throwError("Rating must be between 1 and 5");
    }

    const reviewData = { user, rating, comment };
    return this.http.put<any>(
      `${this.BASE_URL}/review/${productId}`,
      reviewData
    );
  }
}
