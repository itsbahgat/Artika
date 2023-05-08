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
    this.route.navigate(["/mergedProducts"], {
      queryParams: { category: category },
    });
  }
}
