import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/types/cart';
import { Product } from 'src/types/product';
import { ProductServices } from '../services/product.service';
import { ProductCartService } from '../services/productCart.service';

@Component({
  selector: 'ums-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() products: Product[] = [];
  @Output() message :EventEmitter<string> = new EventEmitter<string>();
  err: string = '';
  selectedQuantity: string = '';

  constructor(private productService: ProductServices,
    private productCartService: ProductCartService) { }
  onSelectedQuantity(quantity: string) {
    this.selectedQuantity = quantity;
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
    this.message.emit();
  }
}
