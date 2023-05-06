import { Component, ViewEncapsulation, OnInit, ViewChild, HostListener} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TagInputComponent, TagInputDropdown } from 'ngx-chips';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product/product.service';




export interface AutoCompleteModel {
   value: any,
   display: string
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddProductComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private productService:ProductService){}



  public categories=['Men','Women',
  'Jewelry', 'Accessories',
  'Clothing','Shoes',
  'Home',
  'Toys','Entertainment',
  'Art', 'Collectibles',
  'Craft Supplies', 'Tools'
  ];

  selectedCategories: string[] = [];

  submit(data:product){
    var product = {
      title : data.title,
      description : data.description,
      price : data.price,
      categories : this.selectedCategories,
      images : data.images,
      seller: JSON.parse(localStorage.getItem('user'))._id
    }//need to validate

    this.productService.addProduct(product).subscribe((data)=>{
      console.log(data);
    });
  }

  onItemAdded(addedCat:any){
    this.selectedCategories.push(addedCat.value);
  }


}