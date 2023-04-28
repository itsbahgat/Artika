import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, first } from 'rxjs/operators';



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

  public categories=['men','women','shoes']

  selectedCategories: string[] = [];



  submit(data:any){
    var product = {
      title : data.title,
      description : data.description,
      price : data.price,
      categories : this.selectedCategories,
      images : data.imageURL,
      seller:"ranooma"
    }
    console.log(product);
  }

  onItemAdded(addedCat:any){
    this.selectedCategories.push(addedCat.value);
  }


}