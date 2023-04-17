import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginuserRoutingModule } from './loginuser-routing.module';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    LoginuserComponent
  ],
  imports: [
    CommonModule,
    LoginuserRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule

  ]
})
export class LoginuserModule { }
