import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';


import { ROUTES, Router, RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar'; // import MatToolbarModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthAdminLayoutComponent } from './auth-admin-layout/auth-admin-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AdminLayoutComponent,
    FrontLayoutComponent,
    AuthAdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    FormsModule
  ]
})
export class LayoutModule { }
