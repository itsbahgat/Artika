import { Component, Input , ViewChild } from '@angular/core'
import { basket } from '../../pages/basket/basket.component';
import { AuthService } from '../../pages/services/authuser.service';
import { CartService } from '../../pages/services/cart.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
})
export class Cart {
  @Input() products: any[] = [];
  @ViewChild('basketRef') basketRef!: basket;

  isLoadingRemove = false;
  isLoadingReduce = false;
  isLoadingIncrease = false;

  getTotalPrice() {
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      sum += this.products[i].price * this.products[i].quantity;
    }
    return Math.ceil(sum);
  }
  

  checkBtn() {
    const totalPrice = this.getTotalPrice();
    const roundedTotalPrice = Math.ceil(totalPrice); // round to the nearest upper integer value
    this.router.navigate(['/payment'], {
      queryParams: {
        total: roundedTotalPrice,
      }
    });
  }
  
  
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router // Inject the Router module
  ) {}  

  removeButton(productId){
    this.isLoadingRemove = true;

    const customerId = this.authService.getProperty("_id"); 
    if (!customerId) {
      console.error("Customer ID is undefined");
      return;
    }
  
    if (!this.cartService) {
      console.error("Cart service is undefined");
      return;
    }
  
    this.cartService.removeProductFromCart(customerId, productId).subscribe((response: any) => {
      console.log(response);
      // Reload the cart after successful removal
      this.cartService.getCart(customerId).subscribe((cart: any) => {
        this.products = this.cartService.getProductsFromCart(cart);
        this.isLoadingRemove = false;
      });
    });

  }

  reduceButton(productId){
    this.isLoadingReduce = true;

    const customerId = this.authService.getProperty("_id");
    this.cartService.reduceProductFromCart(customerId, productId).subscribe((response: any) => {
      console.log(response);
      // Reload the cart after successful removal
      this.cartService.getCart(customerId).subscribe((cart: any) => {
        this.products = this.cartService.getProductsFromCart(cart);
        this.isLoadingReduce = false;
      });
    });

  }
  increaseButton(productId) {
    this.isLoadingIncrease = true;

    const customerId = this.authService.getProperty("_id");
    this.cartService.addProductToCart(customerId, productId).subscribe((response: any) => {
      console.log(response);
      // Reload the cart after successful addition
      this.cartService.getCart(customerId).subscribe((cart: any) => {
        this.products = this.cartService.getProductsFromCart(cart);
        this.isLoadingIncrease = false;
      });
    });

  }

}
