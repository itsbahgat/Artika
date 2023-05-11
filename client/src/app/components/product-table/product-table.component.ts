import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/services/authuser.service';
import { ProductService } from 'src/app/pages/services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  ngOnInit(): void {
  }
  
  tableData: any;
  currentPage : any ;
  itemsPerPage : any ;
  totalPages  : any ;
  sellerID : any;
  constructor( private productService : ProductService,private authService : AuthService){
    const verifUser = this.authService.userLoggedIn();
    if (verifUser) {
      this.sellerID = this.authService.getProperty("_id");
    }
    this.productService.getAllProductsForDashboard(this.sellerID).subscribe((data)=>{
      this.tableData = data || {} ;
      this.currentPage = 1;
      this.itemsPerPage = 10;
      this.totalPages = Math.ceil(this.tableData.length/this.itemsPerPage);
    })
  }

  deleteProduct(_id:string){
    const Delete = confirm("Are you sure you want to delete this product?");
    if (Delete){
      this.productService.deleteProduct(_id).subscribe((result)=>{
        if(result){
          alert("Deleted successfully")
        }
      })
    }
  }  

  getStatusClass(status: string): string {
    console.log(status);
    const statusClasses = {
      absent: 'status status-absent',
      present: 'status status-present',
      late: 'status status-late'
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

  editProduct(id:any){

  }

}
