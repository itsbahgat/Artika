import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../services/authuser.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.css"],
})
export class register implements OnInit {
  messageErrors: any;
  user = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    address: "",
    phone: "",
    avatar: null,
  };

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onRegister(user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
    address: string;
    phone: string;
    avatar: File;
  }) {
    const fileInput = this.fileInput.nativeElement;
    const file: File = fileInput.files[0];
    user.avatar = file;
    this.isSubmitting = true;

    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["/loginuser"]).then(() => {
          location.replace(location.href);
        });
      },
      (error) => {
        console.log("error", error.error.errors);
        this.messageErrors = error.error.errors;
        this.isSubmitting = false; // Reset the submitting flag on error
      }
    );
  }
}
