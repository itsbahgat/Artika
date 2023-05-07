import { Component, OnInit } from "@angular/core";
import { CustomerAdminService } from "src/app/pages/services/customer-admin.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  customerCounter: any;
  productCounter: any;
  cartCounter: any;
  orderCost: number;
  constructor(private cutomerAdminService: CustomerAdminService) {}
  ngOnInit(): void {
    this.cutomerAdminService.gettAllCutomers().subscribe((data) => {
      console.log(data);
      this.customerCounter = this.getCount(data); //get count of all customers and assign to customerCounter
    });
    this.cutomerAdminService.getAllProducts().subscribe((data) => {
      this.productCounter = this.getCount(data); //get count of all products and assign to productCounter
    });
    this.cutomerAdminService.getAllCarts().subscribe((data) => {
      this.cartCounter = this.getCount(data); //get count of all carts and assign to cartCounter
    });
    this.cutomerAdminService.getAllOrderes().subscribe((data) => {
      this.orderCost = 0;
      const ordersArray = Object.values(data);
      console.log(ordersArray);
      for (const order of ordersArray) {
        this.orderCost += order.total;
      }
    });
  }

  private getCount(data: any): number {
    const dataArray = Object.values(data);
    return dataArray.length;
  }
}
