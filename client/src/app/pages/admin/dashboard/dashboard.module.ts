import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatIconModule],
})
export class DashboardModule {}
