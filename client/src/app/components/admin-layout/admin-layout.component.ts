import { Component, OnInit } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { AuthadminService } from "src/app/pages/services/authadmin.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"],
})
export class AdminLayoutComponent implements OnInit {
  verifAdmin: any; //to verify user logged in or not
  userName: any = "name";
  opened = false;
  constructor(private adminAuth: AuthadminService, private route: Router) {
    console.log("admin constructor", this.adminAuth.adminLoggedIn());
    console.log("logged", this.adminAuth.adminLoggedIn());
    if (this.adminAuth.adminLoggedIn() == true) {
      this.verifAdmin = true;
      this.userName = this.adminAuth.getProperty("username");
    } else {
      this.verifAdmin = false;
    }
    this.userName = this.adminAuth.getProperty("username");
  }
  ngOnInit(): void {}
  logout() {
    localStorage.removeItem("tokenadmin");
    this.route.navigate(["/admin/login"]).then(() => {
      location.replace(location.href);
    });
  }
}
