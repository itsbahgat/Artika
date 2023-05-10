import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../../components/components.module";
import { SellerDashboardComponent } from "./seller-dashboard.component";

import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    TagInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerDashboardModule {}
