import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductServices } from '../services/product.service';

@Component({
  selector: 'ums-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  err: string = '';
  sub!: Subscription;
  imageWidth: number = 512;
  imageHeight: number = 512;

  constructor(private productService: ProductServices) { }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => (this.err = err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
