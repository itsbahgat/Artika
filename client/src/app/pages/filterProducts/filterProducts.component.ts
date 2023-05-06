import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-filterProducts",
  templateUrl: "filterProducts.component.html",
  styleUrls: ["filterProducts.component.css"],
})
export class products implements OnInit {
  category: string;

  products: any[] = [];

  raw4kgh: string = " ";
  constructor(
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.title.setTitle("ARTIKA");
    this.meta.addTags([
      {
        property: "og:title",
        content: "ARTIKA",
      },
    ]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params.category;
      // console.log("category =================", this.category);
      // Perform additional logic based on the search text
      this.loadProducts();
    });
  }

  loadProducts() {
    if (this.category.length == 0 || this.category == "All") {
      this.productService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.productService.getProductsByCategory(this.category).subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // console.log(
    //   "==========================================products============================"
    // );
    // console.log(this.products);
  }
}
