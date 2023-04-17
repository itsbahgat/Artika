import { Component,OnInit } from '@angular/core';
import { trigger, state, style, transition,animate } from '@angular/animations';
import { AuthuserService } from 'src/app/views/services/authuser.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        backgroundColor: 'purple',
        marginLeft: '20px',
      })),
      state('*', style({
        opacity: 1,
        backgroundColor: 'white',
        marginLeft: '15%',
      })),
      transition('void <=> *', [
        style({
          opacity: 0,

        }),
        animate('1000ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutImg', [
      state('void', style({
        opacity: 0,
        marginLeft: '100px',
      })),
      state('*', style({
        opacity: 1,
        marginLeft: '0px',

      })),
      transition('void <=> *', [
        style({
          opacity: 0
        }),
        animate('1000ms ease-in-out')
      ])
    ])
  ]
})
export class LoginuserComponent implements  OnInit{
  dataToken: any;
  messageError: any;
  constructor(private userService: AuthuserService,private route:Router) {

  }


  ngOnInit(): void {

  }

  login(f:any) {
    let data = f.value
    this.userService.login(data).subscribe(data=>{
      this.dataToken = data
      this.userService.saveToken(this.dataToken.token)

      this.route.navigate(['/']).then(() => {
        location.replace(location.href);
      });
    },(err:HttpErrorResponse)=>this.messageError = err.error.error);

  }


}
