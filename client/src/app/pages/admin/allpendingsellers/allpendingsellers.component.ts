import { Component, OnInit } from "@angular/core";

import { CustomerAdminService } from "src/app/pages/services/customer-admin.service";

@Component({
  selector: "app-allpendingsellers",
  templateUrl: "./allpendingsellers.component.html",
  styleUrls: ["./allpendingsellers.component.css"],
})
export class AllpendingsellersComponent implements OnInit {
  // displayedColumns: string[] = ['username', 'email', 'gender', 'dateOfBirth'];
  // dataSource: MatTableDataSource<User>;
  sellerDataArray: any;
  constructor(private cutomerAdminService: CustomerAdminService) {
    this.cutomerAdminService.getAllPendingSellers().subscribe((data) => {
      console.log(data);
      this.sellerDataArray = data;
    });
  }

  deleteById(id: any, i: number) {
    console.log(id, " ..... ", i);
    this.cutomerAdminService.deleteSellerById(id).subscribe((response) => {
      console.log(response);
      this.sellerDataArray.splice(i, 1);
    });
  }
  approve(id: any, i: number) {
    this.cutomerAdminService.sellerApprove(id).subscribe((response) => {
      console.log(response);
      this.sellerDataArray.splice(i, 1);
    });
  }
  ngOnInit() {
    // this.cutomerAdminService.gettAllCutomers().subscribe(data => {
    //   this.dataSource = new MatTableDataSource<User>(data);
    // });
  }
}
