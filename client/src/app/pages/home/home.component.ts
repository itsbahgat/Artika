import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home {

  product = {
    title: 'Product Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie magna id mauris eleifend, nec malesuada ex aliquet. Sed ac luctus nunc. Sed consectetur, leo a consequat luctus, enim est fringilla felis, vel faucibus odio sapien ut felis.',
    price: 100,
    categories: ['Category 1', 'Category 2'],
    images: ['https://www.ikea.com/us/en/images/products/strandmon-wing-chair-grann-bomstad-dark-brown__0998384_pe823015_s5.jpg', 'https://www.ikea.com/ie/en/images/products/strandmon-wing-chair-skiftebo-yellow__0837297_pe601176_s5.jpg'],
    seller: 'Seller Name',
    date: new Date(),
    reviews: [
      {
        user: 'User 1',
        rating: 4,
        comment: 'This is a great product',
        date: new Date()
      },
      {
        user: 'User 2',
        rating: 5,
        comment: 'Amazing product, highly recommended',
        date: new Date()
      }
    ]
  };


  raw4kgh: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('ARTIKA')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'ARTIKA',
      },
    ])
  }
}
