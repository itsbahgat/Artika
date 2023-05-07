import { Component, ViewEncapsulation, OnInit, ViewChild, HostListener, ElementRef} from '@angular/core';
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

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  
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
  loggedSeller : any = JSON.parse(localStorage.getItem('user'));

  submit(data:product){
    //console.log(data);
    const fileInput = this.fileInput.nativeElement;
    const files: FileList = fileInput.files;

    //console.log(files);
    var product = {
      title : data.title,
      description : data.description,
      price : data.price,
      categories : this.selectedCategories,
      images: files, // Assign the FileList to the 'images' property
      seller: this.loggedSeller._id
    }
    
    console.log(product);

    this.productService.addProduct(product).subscribe((data)=>{
      console.log(data);
    });

  }

  onItemAdded(addedCat:any){
    this.selectedCategories.push(addedCat.value);
  }

  limitFileSelection(input:any) {
    console.log("change");
    const maxFiles = 4;
    
    if (input.files.length > maxFiles) {
      // Get the selected files up to the maximum limit
      const selectedFiles = Array.from(input.files).slice(0, maxFiles);
  
      // Clear the selected files beyond the limit
      input.files = selectedFiles;
  
      // Show the message
      document.getElementById('fileLimitMessage').style.display = 'block';
    } else {
      // Hide the message if the number of files is within the limit
      document.getElementById('fileLimitMessage').style.display = 'none';
    }
  }
  


}