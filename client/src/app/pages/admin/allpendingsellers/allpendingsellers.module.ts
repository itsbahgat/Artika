import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AllpendingsellersComponent } from "./allpendingsellers.component";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [AllpendingsellersComponent],
  imports: [CommonModule, MatTableModule, MatDialogModule],
})
export class AllpendingsellersModule {}
