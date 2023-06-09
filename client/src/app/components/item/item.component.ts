import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CartService } from "../../pages/services/cart.service";
import { CustomerService } from "../../pages/services/customer.service";
import { SellerService } from "../../pages/services/seller.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements AfterViewInit {
  @Input() product: any = {};
  @Input() customerId: string;
  @Input() productID: string;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private customerService: CustomerService,
    private router: Router,
    private sellerService: SellerService
  ) {}

  ngAfterViewInit() {
    this.getSellerById();
    this.getReviewUserById();
  }

  getSellerById() {
    const id = this.product.seller;
    this.sellerService.getSellerById(id).subscribe(
      (data) => {
        const nameReturned = data;
        console.log(nameReturned[0].username);
        this.product.sellerName = nameReturned[0].username;
      },
      (error) => {
        console.log("Error fetching customer data", error);
      }
    );
  }

  getReviewUserById() {
    this.product.reviews.forEach((review) => {
      this.customerService.getCustomerById(review.user).subscribe(
        (data) => {
          const nameReturned = data;
          console.log("hey", nameReturned.username);
          review.username = nameReturned.username;
        },
        (error) => {
          console.log("Error fetching customer data", error);
        }
      );
    });
  }

  addToCart(): void {
    console.log("productID:", this.productID);
    console.log("customerID:", this.customerId);

    this.cartService
      .addProductToCart(this.customerId, this.productID)
      .subscribe(
        (response) => {
          console.log("Successfully added item to cart!", response);
          if (this.confirmAction()) {
            this.router.navigateByUrl("/cart");
          }
          // TODO: Display success message to user
        },
        (error) => {
          console.error("Error adding item to cart", error);
          // TODO: Display error message to user
        }
      );
  }

  confirmAction(): boolean {
    return window.confirm(
      "Item Successfully added. Do you want to go to the cart?"
    );
  }

  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length) %
      this.product.images.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.product.images.length;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  }
}
