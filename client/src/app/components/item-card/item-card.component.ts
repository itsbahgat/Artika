import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.component.html',
  styleUrls: ['item-card.component.css'],
})
export class ItemCard {
  @Input()
  name: string = 'Artika';

  @Input()
  image_src: string =
    'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDI0fHxmb29kfGVufDB8fHx8MTYyNjQ0OTIzNQ&ixlib=rb-1.2.1&w=1500';

  @Input()
  image_alt: string = 'image';

  @Input()
  currency: string = '£';

  @Input()
  value: string = '0';

  @Input()
  rootClassName: string = '';

  @Input()
  itemLink: string = 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDI0fHxmb29kfGVufDB8fHx8MTYyNjQ0OTIzNQ&ixlib=rb-1.2.1&w=1500';

  @Input()
  rating: number = 5;

  constructor() {}
}
