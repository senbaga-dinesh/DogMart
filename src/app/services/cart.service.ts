import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart items from localStorage if they exist
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(items: CartItem[]): void {
    const currentCart = this.cartItems.value;
    const updatedCart = [...currentCart];

    items.forEach(newItem => {
      if (newItem.quantity > 0) {
        const existingItemIndex = updatedCart.findIndex(item => item.name === newItem.name);
        if (existingItemIndex > -1) {
          updatedCart[existingItemIndex].quantity += newItem.quantity;
          updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price;
        } else {
          updatedCart.push({
            ...newItem,
            totalPrice: newItem.quantity * newItem.price
          });
        }
      }
    });

    this.cartItems.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + item.totalPrice, 0);
  }
} 