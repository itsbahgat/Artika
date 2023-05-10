import { Component, OnInit } from "@angular/core";
import { AuthadminService } from "../services/authadmin.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-loginadmin",
  templateUrl: "./loginadmin.component.html",
  styleUrls: ["./loginadmin.component.css"],
})
export class LoginadminComponent implements OnInit {
  messageError: string;
  err: HttpErrorResponse;
  constructor(private authService: AuthadminService, private route: Router) {}

  ngOnInit(): void {}

  onLogin(emailOrUsername: string, password: string) {
    this.authService.login(emailOrUsername, password).subscribe(
      // handle successful response here
      (response) => {
        console.log(response);
        this.route.navigate(["/admin"]).then(() => {
          location.replace(location.href);
        });
      },
      // handle error response here
      (error) => {
        this.messageError = error.message; // set the messageError property with the error message
        console.error(this.messageError);
      }
    );
  }
}
