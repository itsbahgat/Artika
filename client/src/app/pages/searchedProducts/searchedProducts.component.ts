import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-searchedProducts",
  templateUrl: "searchedProducts.component.html",
  styleUrls: ["searchedProducts.component.css"],
})
export class products implements OnInit {
  searchText: string;

  products: any[] = [];

  raw4kgh: string = " ";
  constructor(
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    console.log("cons seach");
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
      this.searchText = params.searchText;
      // console.log("searchText =================", this.searchText);
      // Perform additional logic based on the search text
      this.loadProducts();
    });
  }

  loadProducts() {
    if (this.searchText.length == 0) {
      this.productService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.productService.getProductsByTitle(this.searchText).subscribe(
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
