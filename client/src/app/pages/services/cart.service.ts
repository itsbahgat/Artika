import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.baseUrl}/cart`;

  constructor(private http: HttpClient) { }

  // Fetch cart for a specific customer
  getCart(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${customerId}`);
  }

  // Add a product to the cart for a specific customer
  addProductToCart(customerId: string, productId: string): Observable<any> {
    const body = {
      customerId: customerId,
      productId: productId
    };
    return this.http.post(`${this.baseUrl}`, body);
  }

  // Get products from the items array of the cart response
  getProductsFromCart(cart: any): any[] {
    console.log("cart in service", cart)
    console.log("any property:",cart[0].customerId);
    const products: any[] = [];
  
    const itemsArray = Array.from(cart[0].items); // Convert cart.items to an array
  
    itemsArray.forEach((item: any) => {
      if (item.productId) {
        const product = {
          _id: item.productId._id,
          title: item.productId.title,
          description: item.productId.description,
          price: item.productId.price,
          categories: item.productId.categories,
          images: item.productId.images,
          seller: item.productId.seller,
          date: item.productId.date,
          reviews: item.productId.reviews,
          quantity: item.quantity
        };
        products.push(product);
      }
    });
    console.log("product in service", products);
    return products;
  }

  removeProductFromCart(customerId: string, productId: string): Observable<any> {
    const body = {
      customerId: customerId,
      productId: productId,
      deleteItem: true
    };
    return this.http.put(`${this.baseUrl}`, body);
  }

  reduceProductFromCart(customerId: string, productId: string): Observable<any> {
    const body = {
      customerId: customerId,
      productId: productId,
      deleteItem: false
    };
    return this.http.put(`${this.baseUrl}`, body);
  }
  

  
}
