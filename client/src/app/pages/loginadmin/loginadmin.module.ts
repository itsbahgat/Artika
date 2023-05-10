import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../../components/components.module";
import { LoginadminComponent } from "./loginadmin.component";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule } from "@angular/forms";

const routes = [
  {
    path: "",
    component: LoginadminComponent,
  },
];

@NgModule({
  declarations: [LoginadminComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
  ],
  exports: [LoginadminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginAdminModule {}
