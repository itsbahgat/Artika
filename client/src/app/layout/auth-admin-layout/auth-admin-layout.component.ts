import { Component ,OnInit} from '@angular/core';
import { AuthuserService } from 'src/app/views/services/authuser.service';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.css']
})
export class AuthAdminLayoutComponent implements OnInit{

  constructor(private userService: AuthuserService) {

   }

  ngOnInit(): void {

  }
  loginuser(f:any) {
    let data = f.value
    this.userService.login(data).subscribe(response=>console.log(response),err=>console.log(err))
  }
}
