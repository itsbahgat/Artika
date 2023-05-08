import { Component } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})


export class CategoryComponent {
  categories: any[] = [];
  products: any[] = [];
  selectedCategory: string = null; // New property to store the selected category

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCategoryClick(category: string) {
    if (category === this.selectedCategory) {
      this.route.navigate(["/mergedProducts"]);
      this.selectedCategory = null ;
    } else {
      this.selectedCategory = category; // Set the selected category
      this.route.navigate(["/mergedProducts"], {
        queryParams: { category: category },
      });
    }
  }
  
}
