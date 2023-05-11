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
  productCategories :any;
  public categories = [
    "Men",
    "Women",
    "Jewelry",
    "Accessories",
    "Clothing",
    "Shoes",
    "Home",
    "Toys",
    "Entertainment",
    "Art",
    "Collectibles",
    "Craft Supplies",
    "Tools",
    "Beauty",
    "Ceramics",
    "Handwoven",
    "Home Decor",
    "Kitchen",
    "Leather",
    "Skincare",
    "Stationery",
    "Woodwork",
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productID = params['id'];
      this.productService.getProductById(productID).subscribe((data)=>{
        this.product = data;
        this.productCategories = this.product.categories;
      })
    });
  }

  submit(data:any){
    if(this.product){
      data._id = this.product._id
      data.categories = this.productCategories;
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      console.log(result);
      if (result){
        alert('Product Updated Successfully');
      }
    })
  }

  onItemAdded(addedCat: any) {
    this.productCategories.push(addedCat.value);
  }
}
