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
  displayedProducts: any[] = [];
  category: string = "";
  searchText: string = "";
  isLoading: boolean = true;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

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

  getPages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  loadProducts() {
    this.isLoading = true; // Set loading state

    let productsRequest;
    if (this.category.length > 1) {
      // load filtered products by category
      productsRequest = this.productService.getProductsByCategory(
        this.category
      );
    } else if (this.searchText.length > 0) {
      // load products from search
      productsRequest = this.productService.getProductsByTitle(this.searchText);
    } else {
      // load all products
      productsRequest = this.productService.getAllProducts();
    }

    productsRequest.subscribe(
      (products) => {
        this.products = products;
        this.calculateAverageRating();
        this.isLoading = false; // Clear loading state
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updateDisplayedProducts();
      },
      (error) => {
        console.log(error);
        this.isLoading = false; // Clear loading state in case of error
      }
    );
  }

  getPagesAroundCurrent(): number[] {
    const maxVisiblePages = 4;
    const maxPagesBeforeCurrent = Math.floor((maxVisiblePages - 1) / 2);
    const maxPagesAfterCurrent = Math.ceil((maxVisiblePages - 1) / 2);

    let startPage = this.currentPage - maxPagesBeforeCurrent;
    let endPage = this.currentPage + maxPagesAfterCurrent;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > this.totalPages) {
      startPage -= endPage - this.totalPages;
      endPage = this.totalPages;
    }

    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index)
      .filter((page) => page > 0);
  }

  calculateAverageRating() {
    for (const product of this.products) {
      let totalRating = 0;
      for (const review of product.reviews) {
        totalRating += review.rating;
      }
      const averageRating = totalRating / product.reviews.length;
      product.averageRating = Math.ceil(averageRating); // Add averageRating property to each product
    }
  }
}
