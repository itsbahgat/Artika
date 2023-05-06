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

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    console.log("cons cats");
  }
  ngOnInit(): void {
    console.log("init cats");
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
    // Handle the click event for the category
    console.log("Clicked category:", category);

    this.route.navigate(["/filterProducts"], {
      queryParams: { category: category },
    });
    // // Add your desired logic here
    // this.productService.getProductsByCategory(category).subscribe(
    //   (products) => {
    //     this.products = products;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
