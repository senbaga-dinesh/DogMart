import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userEmail = localStorage.getItem('email');
      if (userEmail) {
        const userData = localStorage.getItem(userEmail);
        if (userData) {
          this.currentUserSubject.next(JSON.parse(userData));
        }
      }
    }
  }

  register(user: User): boolean {
    // Check if user already exists
    const existingUser = localStorage.getItem(user.email);
    if (existingUser) {
      return false;
    }

    // Store user data
    localStorage.setItem(user.email, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const userData = localStorage.getItem(email);
    if (!userData) {
      return false;
    }

    const user: User = JSON.parse(userData);
    if (user.password !== password) {
      return false;
    }

    // Set login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    this.currentUserSubject.next(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserName(): string {
    const user = this.getCurrentUser();
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || '';
  }
} 