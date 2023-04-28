import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ProductData {
  id: string;
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
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() product: ProductData = {
    id: '7445590c3a7c5b869d15853f',
    title: 'Product Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie magna id mauris eleifend, nec malesuada ex aliquet. Sed ac luctus nunc. Sed consectetur, leo a consequat luctus, enim est fringilla felis, vel faucibus odio sapien ut felis.',
    price: 10,
    categories: [],
    images: [],
    seller: 'Seller',
    date: new Date(),
    reviews: []
  };
  @Input() customerId: string = '644558433a7c5b869d158544';

  addToCart(): void {
    const cartUrl = 'http://localhost:8080/cart'; // Replace this with your actual API endpoint
    const requestBody = {
      customerId: this.customerId,
      productId: this.product.id
    };
  
    this.http.post(cartUrl, requestBody).subscribe(
      (response) => {
        console.log('Successfully added item to cart!', response);
        // TODO: Display success message to user
      },
      (error) => {
        console.error('Error adding item to cart', error);
        // TODO: Display error message to user
      }
    );
  }
  
  

  currentImageIndex = 0;

  constructor(private http: HttpClient) {}

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));
  
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  }
}
