import { Component, OnInit } from "@angular/core";

import { CustomerAdminService } from "src/app/pages/services/customer-admin.service";

@Component({
  selector: "app-allcustomers",
  templateUrl: "./allcustomers.component.html",
  styleUrls: ["./allcustomers.component.css"],
})
export class AllcustomersComponent implements OnInit {
  // displayedColumns: string[] = ['username', 'email', 'gender', 'dateOfBirth'];
  // dataSource: MatTableDataSource<User>;
  customerDataArray: any;
  constructor(private cutomerAdminService: CustomerAdminService) {
    this.cutomerAdminService
      .gettAllCutomers()
      .subscribe((data) => (this.customerDataArray = data));
  }

  deleteById(id: any, i: number) {
    console.log(id, " ..... ", i);
    this.cutomerAdminService.deleteCustomerById(id).subscribe((response) => {
      console.log(response);
      this.customerDataArray.splice(i, 1);
    });
  }
  ngOnInit() {
    // this.cutomerAdminService.gettAllCutomers().subscribe(data => {
    //   this.dataSource = new MatTableDataSource<User>(data);
    // });
  }
}
