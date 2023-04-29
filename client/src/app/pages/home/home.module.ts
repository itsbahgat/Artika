import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Home } from './home.component'
import { SellerDashboardModule } from '../seller-dashboard/seller-dashboard.module'


import { FormsModule }   from '@angular/forms';
import { TagInputModule } from 'ngx-chips';


const routes = [
  {
    path: '',
    component: Home,
  }
]

@NgModule({
  declarations: [Home],
  imports: [CommonModule,ComponentsModule, RouterModule.forChild(routes), FormsModule,TagInputModule,
    SellerDashboardModule
    ],
  exports: [Home],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
