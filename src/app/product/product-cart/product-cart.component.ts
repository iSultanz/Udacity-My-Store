import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/types/cart';
import { ProductCartService } from '../services/productCart.service';

@Component({
  selector: 'ums-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit {
  carts: Cart[] = [];
  total!: number;
  name: string = '';
  address: string = '';
  cardNumber: string = '';
  constructor(
    private productCartService: ProductCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carts = this.productCartService.getCart();
    this.total = this.productCartService.calculateTotal();
  }
  onRemoveItem(id: number) {
    alert('Item removed from cart');
    this.productCartService.removeItem(id);
    this.total = this.productCartService.calculateTotal();
  }
  onUpdate() {
    this.total = this.productCartService.calculateTotal();
  }
  onCheckout() {
    if (this.name === '' || this.address === '' || this.cardNumber === '') {
      alert('Please fill all the fields');
    } else if (this.name.length < 3) {
      alert('Please enter a valid name');
    } else if (this.address.length < 5) {
      alert('Please enter a valid address');
    } else if (this.cardNumber.length < 16) {
      alert('Please enter a valid card number');
    } else {
      this.productCartService.clearCart();
      this.carts = [];
      this.total = 0;
      this.router.navigate(['/success']);
    }
  }
}
