import { Component ,OnInit} from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.css']
})
export class AuthAdminLayoutComponent implements OnInit{
  dataToken: any;
  messageError: any;
  constructor(private adminService: AuthadminService,private route:Router) {

   }

  ngOnInit(): void {

  }
  loginAdmin(f:any) {
    let data = f.value
    this.adminService.login(data).subscribe(data => {
      this.dataToken = data
      this.adminService.saveToken(this.dataToken.token.token)

      this.route.navigate(['/admin/dashboard']).then(() => {
        location.replace(location.href);
      });
    },(err:HttpErrorResponse)=>this.messageError = err.error.error);
  }

}
