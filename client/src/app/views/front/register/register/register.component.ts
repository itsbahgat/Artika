import { Component,OnInit } from '@angular/core';
import { AuthuserService } from 'src/app/views/services/authuser.service';
import {Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  messageError: any;

  constructor(private userService: AuthuserService,private rout:Router) { }

  ngOnInit(): void {

  }

  register(f:any) {
    let body = f.value;

    this.userService.register(body).subscribe(data => {
      console.log(data);

      this.rout.navigate(['/userlogin'])
    },(err:HttpErrorResponse)=>{this.messageError=err.error.error});


  }

}
