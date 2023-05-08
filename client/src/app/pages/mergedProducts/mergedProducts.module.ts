import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "../../components/components.module";
import { products } from "./mergedProducts.component";

const routes = [
  {
    path: "",
    component: products,
  },
];

@NgModule({
  declarations: [products],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [products],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
