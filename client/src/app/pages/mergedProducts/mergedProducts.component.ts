import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-mergedProducts",
  templateUrl: "mergedProducts.component.html",
  styleUrls: ["mergedProducts.component.css"],
})
export class products implements OnInit {
  products: any[] = [];
  category: string = "";
  searchText: string = "";

  raw4kgh: string = " ";

  constructor(
    private title: Title,
    private meta: Meta,
    private productService: ProductService,
    private route: ActivatedRoute
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
      this.searchText = params.searchText ? params.searchText : "";
      this.category = params.category ? params.category : "";
      this.loadProducts();
    });
  }

  loadProducts() {
    if (this.category.length > 1) {
      // load filtered products by category
      this.productService.getProductsByCategory(this.category).subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // load products from search
    else if (this.searchText.length > 0) {
      this.productService.getProductsByTitle(this.searchText).subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // load all products
    else {
      this.productService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
