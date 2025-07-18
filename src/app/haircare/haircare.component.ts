import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Product {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-haircare',
  standalone: true,
  templateUrl: './haircare.component.html',
  imports: [CommonModule, HeaderComponent],
  styleUrls: ['./haircare.component.css']
})
export class HaircareComponent implements OnInit {
  products: Product[] = [
    { 
      name: 'Shampoo', 
      image: 'https://goofytails.com/cdn/shop/products/AcaciaandBerryCleanDogShampoo01_1800x1800.jpg?v=1676113588', 
      quantity: 0,
      price: 19.99
    },
    { 
      name: 'Hair Oil', 
      image: 'https://goofytails.com/cdn/shop/files/7_1_f080a188-7405-414e-8694-2f6599f3611b_1800x1800.jpg?v=1683191215', 
      quantity: 0,
      price: 24.99
    },
    { 
      name: 'Paw Cream', 
      image: 'https://goofytails.com/cdn/shop/products/Goofy_Tails_30_g_Paw_cream_for_dogs_and_puppies_1800x1800.jpg?v=1681476220', 
      quantity: 0,
      price: 14.99
    },
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  get hasItemsInCart(): boolean {
    return this.products.some(product => product.quantity > 0);
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  addAllToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const cartItems: CartItem[] = this.products
      .filter(product => product.quantity > 0)
      .map(product => ({
        name: product.name,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        totalPrice: product.price * product.quantity
      }));

    if (cartItems.length === 0) {
      alert('Please select at least one item to add to cart');
      return;
    }

    this.cartService.addToCart(cartItems);
    this.router.navigate(['/cart']);

    // Reset quantities after adding to cart
    this.products.forEach(product => product.quantity = 0);
  }

  getItemTotal(product: Product): number {
    return product.price * product.quantity;
  }
}
