import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-post-card',
  templateUrl: 'blog-post-card.component.html',
  styleUrls: ['blog-post-card.component.css'],
})
export class BlogPostCard {
  @Input()
  image_alt: string = 'image'
  @Input()
  rootClassName: string = ''
  @Input()
  new_prop: string = 'Chic sofa designs for 2022'
  @Input()
  image_src: string =
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHZlbmljZXxlbnwwfHx8fDE2MjYyNzIyOTA&ixlib=rb-1.2.1&w=1500'
  @Input()
  description: string =
    'Consectetur adipiscing elit duis tristique sollicitudin nibh'
  @Input()
  link_to: string = ''
  constructor() {}
}
