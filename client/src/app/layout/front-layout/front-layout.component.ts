import { Component, OnInit} from '@angular/core';
import { AuthuserService } from 'src/app/views/services/authuser.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent implements OnInit{
  verifUser: any //to verify user logged in or not
  userName: any ="name"
  constructor(private userAuth: AuthuserService,private route:Router) {

    if (this.userAuth.userLoggedIn() == true) {
      this.verifUser = true
      this.userName = userAuth.getUserName();
    } else {
      this.verifUser=false
    }

  }
  ngOnInit(): void {

  }
  logout() {
    localStorage.removeItem('tokenuser')
    this.route.navigate(['/userlogin']).then(() => {
      location.replace(location.href);
    });
  }

}
