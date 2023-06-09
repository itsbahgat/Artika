import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, throwError } from "rxjs";
import { Title } from "@angular/platform-browser";
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly BASE_URL = `${environment.baseUrl}/api/product`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/`);
  }

  getAllProductsForDashboard(sellerID: string): Observable<any> {
    return this.http.get<any[]>(`${this.BASE_URL}/seller/${sellerID}`).pipe(
      map(products => {
        // Modify each product object to include only chosen properties
        return products.map(product => ({
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          categories: product.categories
        }));
      })
    );
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

  addProduct(product:any){
    return this.http.post<any>(this.BASE_URL,product);
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
