import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/services/authuser.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  verifUser: any; // to verify if the user is logged in or not
  userName: any = "name";
  isSeller: boolean = false; // property to check if the user is a seller

  constructor(private userAuth: AuthService, private route: Router) {
    this.verifUser = this.userAuth.userLoggedIn();
    if (this.verifUser) {
      this.userName = this.userAuth.getProperty("username");
      const role = this.userAuth.getProperty("role");
      this.isSeller = role === "seller";
    }
  }

  searchText: string;

  onSearch(): void {
    // Navigate to the new page with the search text as a parameter
    this.route.navigate(["/mergedProducts"], {
      queryParams: { searchText: this.searchText },
    });
  }

  logout() {
    this.userAuth.logout();
    // navigate to home page or login page
    this.route.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.route.navigate(["/loginuser"]).then(() => {
        location.replace(location.href);
      });
    });
  }
}
