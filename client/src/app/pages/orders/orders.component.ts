import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../pages/services/orders.service';
import { AuthService } from '../../pages/services/authuser.service';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.css'],
})
export class Orders implements OnInit {
  orders: any[] = []; // Array to store the fetched orders
  loading: boolean = true; // Loading flag
  currentPage: number = 1;
  ordersPerPage: number = 3;


  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Call the method to get all order details
    this.getAllOrderDetails();
  }

  getAllOrderDetails() {
    // Use the OrdersService to fetch all order details
    const customerId = this.authService.getProperty('_id');
    this.ordersService.getOrderDetails(customerId).subscribe(
      (response) => {
        // Handle the response data here
        this.orders = response; // Assign the response to the orders array
        this.loading = false; // Set loading flag to false when data is loaded
        console.log(response);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error(error);
        this.loading = false; // Set loading flag to false in case of error
      }
    );
  }

  calculateTotalQuantity(order: any): number {
    let totalQuantity = 0;
    order.items.forEach((item: any) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  removeFraction ( number : number){
    return Math.ceil(number);
  }

cancelOrder(orderId) {
    this.ordersService.cancelOrder(orderId)
      .subscribe(
        response => {
          console.log('Order cancelled successfully', response);
          this.getAllOrderDetails();
          // Perform any additional actions upon cancellation
        },
        error => {
          console.error('Failed to cancel order', error);
          // Handle error scenarios
        }
      );
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.ordersPerPage);
  }

  get paginatedOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.ordersPerPage;
    const endIndex = startIndex + this.ordersPerPage;
    return this.orders.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  
  
}
