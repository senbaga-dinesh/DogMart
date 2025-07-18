import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onCartClick(event: Event): void {
    event.preventDefault();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
