import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AllsellersComponent } from "./allsellers.component";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [AllsellersComponent],
  imports: [CommonModule, MatTableModule, MatDialogModule],
})
export class AllsellersModule {}
