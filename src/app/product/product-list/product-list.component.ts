import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../types/product';
import { ProductServices } from '../services/product.service';
import { ProductCartService } from '../services/productCart.service';

@Component({
  selector: 'ums-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  err: string = '';
  sub!: Subscription;
  selectedQuantity: string = '';

  constructor(private productService: ProductServices,
    private productCartService: ProductCartService) { }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => (this.err = err),
    });
  }
  ngOnDestroy(): void {
  }
  alertOnSuccess() {
    alert('Product added to cart');
  }
}

