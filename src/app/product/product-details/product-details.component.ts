import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../types/product';
import { ProductServices } from '../services/product.service';

@Component({
  selector: 'ums-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product!: Product;
  sub!: Subscription;
  err: string = '';

  constructor(
    private productService: ProductServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.product = this.products.find((product) => product.id === id)!;
      },
      error: (err) => (this.err = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
