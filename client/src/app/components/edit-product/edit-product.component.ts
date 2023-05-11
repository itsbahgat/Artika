import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/pages/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService:ProductService) { }
  product : any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const productID = params['id'];
      console.log(productID);
      this.productService.getProductById(productID).subscribe((data)=>{
        this.product = data;
      })
    });

  }

  submit(data:any){

  }
}
