import { Component, OnInit } from "@angular/core";

import { CustomerAdminService } from "src/app/pages/services/customer-admin.service";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-allorders",
  templateUrl: "./allorders.component.html",
  styleUrls: ["./allorders.component.css"],
})
export class AllordersComponent implements OnInit {
  // displayedColumns: string[] = ['username', 'email', 'gender', 'dateOfBirth'];
  // dataSource: MatTableDataSource<User>;
  orderDataArray: any;
  constructor(private cutomerAdminService: CustomerAdminService) {
    this.cutomerAdminService.getAllOrderes().subscribe((data) => {
      this.orderDataArray = data;
      console.log(this.orderDataArray);
    });
  }

  // deleteById(id: any, i: number) {
  //   console.log(id, " ..... ", i);
  //   this.cutomerAdminService.deleteCustomerById(id).subscribe((response) => {
  //     console.log(response);
  //     this.orderDataArray.splice(i, 1);
  //   });
  // }
  getOrderById(id: any) {
    console.log(id);
    this.cutomerAdminService.getOrderById(id).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    // this.cutomerAdminService.gettAllCutomers().subscribe(data => {
    //   this.dataSource = new MatTableDataSource<User>(data);
    // });
  }
}
