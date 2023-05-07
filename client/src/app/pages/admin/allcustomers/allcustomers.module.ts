import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AllcustomersComponent } from "./allcustomers.component";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [AllcustomersComponent],
  imports: [CommonModule, MatTableModule, MatDialogModule],
})
export class AllcustomersModule {}
