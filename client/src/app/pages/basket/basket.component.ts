import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css'],
})
export class basket {
  
  products = [
    {
      title: 'Product Title 1',
      description: 'Product description 1',
      price: 10,
      categories: ['Category 1', 'Category 2'],
      images: ['https://picsum.photos/200/300?random=1', 'https://picsum.photos/200/300?random=2'],
      seller: 'Seller 1',
      date: new Date(),
      reviews: []
    },
    {
      title: 'Product Title 2',
      description: 'Product description 2',
      price: 15,
      categories: ['Category 3'],
      images: ['https://picsum.photos/200/300?random=3', 'https://picsum.photos/200/300?random=4'],
      seller: 'Seller 2',
      date: new Date(),
      reviews: []
    }
  ];
  


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
