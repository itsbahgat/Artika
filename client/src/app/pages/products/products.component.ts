import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css'],
})
export class products implements OnInit {
  
  products: any[] = [];
  
  raw4kgh: string = ' ';

  constructor(private title: Title, private meta: Meta, private productService: ProductService) {
    this.title.setTitle('ARTIKA')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'ARTIKA',
      },
    ])
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
