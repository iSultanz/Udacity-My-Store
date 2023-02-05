import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/types/cart';
import { Product } from '../../../types/product';
import { ProductServices } from '../services/product.service';
import { ProductCartService } from '../services/productCart.service';

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
  selectedQuantity: string = '';

  constructor(
    private productService: ProductServices,
    private productCartService: ProductCartService,
    private route: ActivatedRoute,
    private router: Router
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

  backToProduct(): void {
    this.router.navigate(['/products']);
  }
  onSubmitProduct(product: Product) {
    let item: Cart = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: parseInt(this.selectedQuantity),
      image: product.image,
    }
    this.productCartService.addToCart(item);
    alert('Product added to cart');
  }
  onSelectedQuantity(quantity: string) {
    this.selectedQuantity = quantity;
  }
}
