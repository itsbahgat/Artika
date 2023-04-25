import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcustomersComponent } from './allcustomers/allcustomers.component';

const routes: Routes = [
  {path:'',component:AllcustomersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllcustomersRoutingModule { }
