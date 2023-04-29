import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { SellerDashboardComponent } from './seller-dashboard.component'


import { FormsModule }   from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [SellerDashboardComponent],
  imports: [CommonModule,
    ComponentsModule,
    FormsModule,
    TagInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ],
  exports: [SellerDashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerDashboardModule {}
