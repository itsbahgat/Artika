import { Component } from '@angular/core';
import { AuthService } from '../services/authuser.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: 'pay.component.html',
  styleUrls: ['pay.component.css'],
})
export class pay {
  customerID: string ;
  total:number;
  constructor(private authService: AuthService , private route: ActivatedRoute) {}

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
      this.total = params['total'];
    });
    this.customerID  = this.authService.getProperty("_id"); 
    console.log("customer id---" , this.customerID);
    console.log("total---" , this.total);
  }
  
}
