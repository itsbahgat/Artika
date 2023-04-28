import { Component,OnInit } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthuserService } from '../services/authuser.service';




@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
  
})
export class register implements  OnInit{
  messageError: any;

  constructor(private userService: AuthuserService,private rout:Router) { }

  ngOnInit(): void {

  }

  register(f:any) {
    let body = f.value;

    this.userService.register(body).subscribe(data => {
      console.log(data);

      this.rout.navigate(['/loginuser'])
    },(err:HttpErrorResponse)=>{this.messageError=err.error.error});


  }

}
