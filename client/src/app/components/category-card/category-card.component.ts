import { Component, Input } from "@angular/core";

@Component({
  selector: "category-card",
  templateUrl: "category-card.component.html",
  styleUrls: ["category-card.component.css"],
})
export class CategoryCard {
  @Input()
  category_img: string =
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1170104811.jpeg?resize=1200:*";
  @Input()
  image_alt: string = "image";
  @Input()
  name: string = "Men";
  constructor() {}
}
