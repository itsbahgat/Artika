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
  
  product: any = {
    "_id": "1234abcd",
    "title": "Example Product",
    "description": "This is an example product description.",
    "price": 19.99,
    "categories": [
        "Example Category 1",
        "Example Category 2"
    ],
    "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    "seller": "5678efgh",
    "date": "2023-05-01T12:00:00.000Z",
    "reviews": [
        {
            "user": "ijklmnop",
            "rating": 5,
            "comment": "This is a great product!",
            "_id": "qrstuvwx",
            "date": "2023-05-01T12:05:00.000Z"
        }
    ],
    "createdAt": "2023-05-01T12:00:00.000Z",
    "updatedAt": "2023-05-01T12:05:00.000Z",
    "__v": 1
  };
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
