import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/pages/services/orders.service';
import { AuthService } from 'src/app/pages/services/authuser.service';
import { Observable } from 'rxjs'; // Import the Observable class from RxJS


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{

  tableData: any[] = null;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages :number;
  sellerID : string;

  constructor(private orderService: OrdersService, private authService:  AuthService){
  }

  ngOnInit() {
    const verifUser = this.authService.userLoggedIn();
    if (verifUser) {
      this.sellerID = this.authService.getProperty("_id");
    }
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    
    // Call the getOrderDetailsForSellers function and subscribe to the returned Observable
    this.orderService.getOrderDetailsForSellers(this.sellerID).subscribe(
      (data: any) => {
        this.tableData = data; // Assign the received data to the tableData property'
        this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
      },
      (error: any) => {
        console.error(error); // Handle the error appropriately
      }
    );
  }
 

  getStatusClass(status: string): string {
    const statusClasses = {
      absent: 'status status-absent',
      delivered: 'status status-delivered',
      pending: 'status status-pending'
    };
  
    status = status.toLowerCase();
    return statusClasses[status] || '';
  }
  
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }

  get paginatedTableData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tableData.slice(startIndex, endIndex);
  }

  previousPage() {
    this.currentPage--;
  }
  
  nextPage() {
    this.currentPage++;
  }
  
}