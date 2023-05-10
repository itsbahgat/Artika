import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AllordersComponent } from "./allorders.component";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AllordersComponent],
  imports: [CommonModule, MatTableModule, MatDialogModule, FormsModule],
})
export class AllordersModule {}
