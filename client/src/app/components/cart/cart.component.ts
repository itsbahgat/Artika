import { Component, Input } from '@angular/core'

interface ProductData {
  title: string;
  description: string;
  price: number;
  categories: string[];
  images: string[];
  seller: string;
  date: Date;
  reviews: {
    user: string;
    rating: number;
    comment?: string;
    date: Date;
  }[];
}

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
})
export class Cart {
  @Input() products: ProductData[] = [
    {
      title: 'Product Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie magna id mauris eleifend, nec malesuada ex aliquet. Sed ac luctus nunc. Sed consectetur, leo a consequat luctus, enim est fringilla felis, vel faucibus odio sapien ut felis.',
      price: 10,
      categories: [],
      images: ['https://www.ikea.com/us/en/images/products/strandmon-wing-chair-grann-bomstad-dark-brown__0998384_pe823015_s5.jpg', 'https://www.ikea.com/ie/en/images/products/strandmon-wing-chair-skiftebo-yellow__0837297_pe601176_s5.jpg'],
      seller: 'Seller',
      date: new Date(),
      reviews: []
    },
    {
      title: 'Product 2',
      description: 'A second product description goes here',
      price: 15,
      categories: ['Electronics', 'Accessories'],
      images: ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/id/238/200/300'],
      seller: 'Seller 2',
      date: new Date(),
      reviews: []
    },
    {
      title: 'Product 3',
      description: 'Another product description',
      price: 25,
      categories: ['Home Goods'],
      images: ['https://picsum.photos/id/239/200/300', 'https://picsum.photos/id/240/200/300'],
      seller: 'Seller 3',
      date: new Date(),
      reviews: []
    }
    
  ];

  getTotalPrice(){
    var sum=0;
    for (let i = 0; i< this.products.length; i++) {
    const element = this.products[i].price;
    sum+=element
    }
    return sum;
  }
  constructor() {}
}
