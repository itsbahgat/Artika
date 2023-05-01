import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authuser.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-loginuser',
  templateUrl: 'loginuser.component.html',
  styleUrls: ['loginuser.component.css'],
  // ...
})
export class loginuser implements OnInit {
  messageError: string;
  err: HttpErrorResponse;
  constructor(private authService: AuthService,private route:Router) {}

  ngOnInit(): void {}

  onLogin(emailOrUsername: string, password: string) {
    this.authService.login(emailOrUsername, password)
      .subscribe(
        // handle successful response here
        response => {
          console.log(response);
          this.route.navigate(['/']).then(() => {
        location.replace(location.href);
      });
        },
        // handle error response here
        error => {
          
          this.messageError = error.message; // set the messageError property with the error message
          console.error(this.messageError);
        },
       
      );
  }
}
