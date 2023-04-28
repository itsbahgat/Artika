import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { AuthuserService } from 'src/app/pages/services/authuser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  verifUser: any //to verify user logged in or not
  userName: any ="name"

  constructor(private userAuth: AuthuserService, private route: Router) {
    if (this.userAuth.userLoggedIn() == true) {
      this.verifUser = true
      this.userName = userAuth.getUserName();
    } else {
      this.verifUser=false
    }
  }
  logout() {
    localStorage.removeItem('tokenuser')
    this.route.navigate(['/loginuser']).then(() => {
      location.replace(location.href);
    });
  }
}
