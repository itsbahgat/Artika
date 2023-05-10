import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/authuser.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class register implements OnInit {
  messageError: string;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    address: '',
    phone: '',
    avatar:null
  };

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  constructor(private authService: AuthService,private route:Router) {}

  ngOnInit(): void {}

  onRegister(user: {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    role: string,
    address: string,
    phone: string,
    avatar: File
  }) {
    console.log("user")
    console.log(user)
    const fileInput = this.fileInput.nativeElement;
    const file: File = fileInput.files[0];
    user.avatar=file;
    this.authService.register(user)
      .subscribe(
        // handle successful response here
        response => {
          console.log(response);
          this.route.navigate(['/loginuser']).then(() => {
        location.replace(location.href);
      });
        },
        // handle error response here
        error => this.messageError = error.error.message
      );
  }
}
