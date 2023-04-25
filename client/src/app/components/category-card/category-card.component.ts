import { Component, Input } from '@angular/core'

@Component({
  selector: 'category-card',
  templateUrl: 'category-card.component.html',
  styleUrls: ['category-card.component.css'],
})
export class CategoryCard {
  @Input()
  category_img: string =
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEyfHxjaGFpcnxlbnwwfHx8fDE2NTI4MTgxODk&ixlib=rb-1.2.1&w=1500'
  @Input()
  image_alt: string = 'image'
  @Input()
  name: string = 'Desks'
  constructor() {}
}
