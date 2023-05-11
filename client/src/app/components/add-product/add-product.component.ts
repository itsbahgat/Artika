import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { product } from "src/app/data-type";
import { ProductService } from "src/app/pages/services/product.service";

import { NgForm } from "@angular/forms";

export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AddProductComponent implements OnInit {
  isLoading: boolean = false;

  ngOnInit(): void {}

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  constructor(private productService: ProductService) {}

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
  selectedCategories: string[] = [];
  loggedSeller: any = JSON.parse(localStorage.getItem("user"));

  submit(addProduct: NgForm) {
    if (addProduct.valid) {
      // Set isLoading to true
      this.isLoading = true;

      const data: product = addProduct.value;

      const fileInput = this.fileInput.nativeElement;
      const files: FileList = fileInput.files;

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("seller", this.loggedSeller._id);

      for (let i = 0; i < this.selectedCategories.length; i++) {
        formData.append("categories", this.selectedCategories[i]);
      }

      const fileLimit = 4;
      const totalFiles = Math.min(files.length, fileLimit);

      if (files.length > fileLimit) {
        const message = `You have selected ${files.length} files. Only the first ${fileLimit} files will be considered.`;
        alert(message);
      }

      for (let i = 0; i < totalFiles; i++) {
        formData.append("images", files[i]);
      }

      this.productService.addProduct(formData).subscribe(
        (data) => {
          // API call success
          alert("Your product added successfully");
          // Set isLoading back to false
          this.isLoading = false;
        },
        (error) => {
          // API call error
          alert("An error occurred while adding the product");
          // Set isLoading back to false
          this.isLoading = false;
        }
      );
    } else {
      // Form is invalid
      alert("Please enter valid data");
    }
  }

  onItemAdded(addedCat: any) {
    this.selectedCategories.push(addedCat.value);
  }
}
