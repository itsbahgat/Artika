import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "teleport-project-template-angular";

  constructor(private route: ActivatedRoute) {}

  isSellerDashboard(): boolean {
    if (
      this.route.snapshot.firstChild?.routeConfig?.path ===
        "seller-dashboard" ||
      this.route.snapshot.firstChild?.routeConfig?.path === "admin" ||
      this.route.snapshot.firstChild?.routeConfig?.path === "loginadmin"
    )
      return true;
  }
}
