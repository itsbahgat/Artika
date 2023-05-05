import { Component } from '@angular/core';
import { AuthService } from '../services/authuser.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pay',
  templateUrl: 'pay.component.html',
  styleUrls: ['pay.component.css'],
})
export class pay {
  customerID: string = '644a3d3b258e50fdb4843ca2';
  total:number=4000;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Fetch cart data for customer
    const customerID = this.customerID; // Replace with the actual customer ID
    // const customerID = this.authService.getProperty("_id"); // Replace with the actual customer ID
    console.log("customer id" , customerID);
    const total =this.total; //should be recieved from front 
    console.log("total" , total);
  }
  
}
