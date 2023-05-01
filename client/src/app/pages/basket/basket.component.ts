import { Component } from '@angular/core';
import { AuthService } from '../services/authuser.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css'],
})
export class basket {
  products: any[] = [];
    
  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    // Fetch cart data for customer
    const customerId = this.authService.getProperty("_id"); // Replace with the actual customer ID
    console.log("cart customer id" , customerId);
    this.cartService.getCart(customerId).subscribe((cart: any) => {
      console.log("cart", cart);
      this.products = this.cartService.getProductsFromCart(cart);
      console.log("products", this.products);
    });
  }
  
}
