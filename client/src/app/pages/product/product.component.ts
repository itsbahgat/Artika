import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/authuser.service';


@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
})
export class product implements OnInit {
  
  product: any ={};
  customerId: string = '0';
  productId: string = '0';

  
  constructor( private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadProduct(id);
    this.customerId = this.authService.getProperty('_id');
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
        this.productId = this.product._id
        console.log("product load:",this.product);
        console.log("customerID:",this.customerId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

}
