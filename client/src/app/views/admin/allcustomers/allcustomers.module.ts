import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllcustomersRoutingModule } from './allcustomers-routing.module';
import { AllcustomersComponent } from './allcustomers/allcustomers.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AllcustomersComponent
  ],
  imports: [
    CommonModule,
    AllcustomersRoutingModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class AllcustomersModule { }
