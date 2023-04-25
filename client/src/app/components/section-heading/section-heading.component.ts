import { Component, Input } from '@angular/core'

@Component({
  selector: 'section-heading',
  templateUrl: 'section-heading.component.html',
  styleUrls: ['section-heading.component.css'],
})
export class SectionHeading {
  @Input()
  heading: string = 'TRENDING ITEMS'
  @Input()
  subtitle: string =
    'Explore our monthly most trending products, new items and the best Mobilio offers you can buy'
  @Input()
  rootClassName: string = ''
  constructor() {}
}
