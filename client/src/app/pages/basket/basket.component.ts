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
  isLoading: boolean = true;
    
  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    const customerId = this.authService.getProperty("_id");
    console.log("cart customer id", customerId);
    this.cartService.getCart(customerId).subscribe((cart: any) => {
      console.log("cart", cart);
      this.products = this.cartService.getProductsFromCart(cart);
      console.log("products", this.products);
      this.isLoading = false; // Data loaded, set isLoading to false
    });
  }
}
